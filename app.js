// Global state
let templates = {};
let selectedTemplates = new Set();

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function () {
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('templateFiles');

    // Drag and drop handlers
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.style.backgroundColor = '#f8f9fa';
    });

    uploadZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadZone.style.backgroundColor = '';
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.style.backgroundColor = '';
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    // File input handler
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    // Click to upload
    uploadZone.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON') {
            fileInput.click();
        }
    });
});

// Handle uploaded files
async function handleFiles(files) {
    for (let file of files) {
        if (file.name.endsWith('.html') || file.name.endsWith('.md')) {
            const content = await readFileContent(file);
            templates[file.name] = content;
            selectedTemplates.add(file.name);
        }
    }
    renderTemplateList();
    loadVariables();
}

// Read file content
function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
    });
}

// Render template list
function renderTemplateList() {
    const templateList = document.getElementById('templateList');

    if (Object.keys(templates).length === 0) {
        templateList.innerHTML = '<p class="text-muted text-center">Nessun template caricato. Carica i file sopra.</p>';
        return;
    }

    let html = '';
    for (let templateName in templates) {
        const isChecked = selectedTemplates.has(templateName);
        html += `
            <div class="form-check mb-2">
                <input class="form-check-input template-checkbox" 
                       type="checkbox" 
                       id="${templateName}" 
                       value="${templateName}"
                       ${isChecked ? 'checked' : ''}
                       onchange="toggleTemplate('${templateName}')">
                <label class="form-check-label" for="${templateName}">
                    <span class="badge badge-template">${templateName}</span>
                </label>
            </div>
        `;
    }
    templateList.innerHTML = html;
}

// Toggle template selection
function toggleTemplate(templateName) {
    if (selectedTemplates.has(templateName)) {
        selectedTemplates.delete(templateName);
    } else {
        selectedTemplates.add(templateName);
    }
    loadVariables();
}

// Extract variables from template content
function extractVariables(content) {
    const regex = /{{(.*?)}}/g;
    const variables = new Set();
    let match;

    while ((match = regex.exec(content)) !== null) {
        variables.add(match[1].trim());
    }

    return Array.from(variables);
}

// Load and display variable input fields
function loadVariables() {
    const dynamicFieldsContainer = document.getElementById('dynamicFields');
    const dynamicFieldsCard = document.getElementById('dynamicFieldsContainer');
    const compileBtnContainer = document.getElementById('compileBtnContainer');

    dynamicFieldsContainer.innerHTML = '';

    if (selectedTemplates.size === 0) {
        dynamicFieldsCard.style.display = 'none';
        compileBtnContainer.style.display = 'none';
        return;
    }

    // Collect all unique variables from selected templates
    const allVariables = new Set();
    for (let templateName of selectedTemplates) {
        const content = templates[templateName];
        const vars = extractVariables(content);
        vars.forEach(v => allVariables.add(v));
    }

    if (allVariables.size > 0) {
        dynamicFieldsCard.style.display = 'block';
        compileBtnContainer.style.display = 'block';

        // Create input fields for each variable
        allVariables.forEach(varName => {
            const col = document.createElement('div');
            col.classList.add('col-md-6', 'mb-3');

            const label = document.createElement('label');
            label.classList.add('form-label', 'fw-bold');
            label.textContent = varName;

            const input = document.createElement('input');
            input.type = 'text';
            input.id = `var_${varName}`;
            input.name = varName;
            input.classList.add('form-control');
            input.required = true;
            input.placeholder = `Inserisci ${varName}`;

            col.appendChild(label);
            col.appendChild(input);
            dynamicFieldsContainer.appendChild(col);
        });
    } else {
        dynamicFieldsCard.style.display = 'none';
        compileBtnContainer.style.display = 'none';
    }
}

// Compile templates with user input
function compileTemplates() {
    // Collect all variable values
    const variables = {};
    const inputs = document.querySelectorAll('#dynamicFields input');

    let hasEmptyFields = false;
    inputs.forEach(input => {
        if (!input.value.trim()) {
            hasEmptyFields = true;
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid');
            variables[input.name] = input.value;
        }
    });

    if (hasEmptyFields) {
        alert('⚠️ Per favore, compila tutti i campi richiesti!');
        return;
    }

    // Compile each selected template
    const compiledDocuments = [];

    for (let templateName of selectedTemplates) {
        let content = templates[templateName];

        // Replace all variables
        for (let varName in variables) {
            const regex = new RegExp(`{{${varName}}}`, 'g');
            content = content.replace(regex, escapeHtml(variables[varName]));
        }

        compiledDocuments.push({
            name: templateName,
            content: content
        });
    }

    displayResults(compiledDocuments, variables);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Display compilation results
function displayResults(compiledDocuments, variables) {
    const resultsSection = document.getElementById('resultsSection');
    const compiledDocumentsContainer = document.getElementById('compiledDocuments');

    // Get selected export format
    const exportFormat = document.querySelector('input[name="exportFormat"]:checked').value;

    let html = '<div class="row">';

    compiledDocuments.forEach((doc, index) => {
        const ragioneSociale = variables['ragione_sociale'] || 'documento';
        const safeName = ragioneSociale.toLowerCase().replace(/[^a-z0-9]/gi, '');
        const templateBaseName = doc.name.replace(/\.(html|md)$/, '');
        const filename = `documento_${safeName}_${templateBaseName.toLowerCase()}.${exportFormat}`;

        html += `
            <div class="col-md-6 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">📄 ${doc.name}</h5>
                        <p class="text-muted small">${filename}</p>
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary" onclick="previewDocument(${index})">
                                👁️ Anteprima
                            </button>
                            <button class="btn btn-outline-primary" onclick="downloadDocument(${index}, '${filename}', '${exportFormat}')">
                                💾 Scarica ${exportFormat.toUpperCase()}
                            </button>
                            <button class="btn btn-outline-secondary" onclick="copyContent(${index})">
                                📋 Copia Contenuto
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    html += '</div>';
    html += `
        <div class="text-center mt-4">
            <button class="btn btn-outline-secondary" onclick="downloadAllAsZip()">
                📦 Scarica Tutti (${exportFormat.toUpperCase()})
            </button>
            <button class="btn btn-outline-secondary ms-2" onclick="resetApp()">
                🔄 Nuova Compilazione
            </button>
        </div>
    `;

    compiledDocumentsContainer.innerHTML = html;
    resultsSection.style.display = 'block';

    // Store compiled documents globally for later use
    window.compiledDocs = compiledDocuments;
    window.exportFormat = exportFormat;
    window.compiledFilenames = compiledDocuments.map((doc, i) => {
        const ragioneSociale = variables['ragione_sociale'] || 'documento';
        const safeName = ragioneSociale.toLowerCase().replace(/[^a-z0-9]/gi, '');
        const templateBaseName = doc.name.replace(/\.(html|md)$/, '');
        return `documento_${safeName}_${templateBaseName.toLowerCase()}.${exportFormat}`;
    });

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Preview document in new window
function previewDocument(index) {
    const doc = window.compiledDocs[index];
    const newWindow = window.open('', '_blank');
    newWindow.document.write(doc.content);
    newWindow.document.close();
}

// Download single document
function downloadDocument(index, filename, format) {
    try {
        const doc = window.compiledDocs[index];

        // Set MIME type based on format
        const mimeType = format === 'md' ? 'text/markdown;charset=utf-8' : 'text/html;charset=utf-8';

        const blob = new Blob([doc.content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);

        // Click and wait before cleanup to ensure download starts
        a.click();

        // Cleanup after a delay to ensure download completes
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);

        // Show success message
        console.log('Download avviato:', filename);

    } catch (error) {
        console.error('Errore durante il download:', error);
        alert('❌ Errore durante il download. Prova a usare "Copia Contenuto" invece.');
    }
}

// Copy document content to clipboard
function copyContent(index) {
    const doc = window.compiledDocs[index];

    // Parse HTML and extract body content
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(doc.content, 'text/html');
    const bodyContent = htmlDoc.body ? htmlDoc.body.innerHTML : doc.content;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(bodyContent).then(() => {
            alert('✅ Contenuto copiato con successo!');
        }).catch(err => {
            console.error('Errore durante la copia:', err);
            fallbackCopy(bodyContent);
        });
    } else {
        fallbackCopy(bodyContent);
    }
}

// Fallback copy method
function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        alert('✅ Contenuto copiato con successo!');
    } catch (err) {
        alert('❌ Impossibile copiare il contenuto.');
    }
    document.body.removeChild(textarea);
}

// Download all documents as ZIP
async function downloadAllAsZip() {
    // For simplicity, we'll download each file separately
    // A full ZIP implementation would require a library like JSZip
    alert('📦 Scaricamento di tutti i file...');

    window.compiledDocs.forEach((doc, index) => {
        setTimeout(() => {
            const format = window.exportFormat;
            downloadDocument(index, window.compiledFilenames[index], format);
        }, index * 200); // Stagger downloads
    });
}

// Reset application
function resetApp() {
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('dynamicFieldsContainer').style.display = 'none';
    document.getElementById('compileBtnContainer').style.display = 'none';

    // Clear all input fields
    const inputs = document.querySelectorAll('#dynamicFields input');
    inputs.forEach(input => {
        input.value = '';
        input.classList.remove('is-invalid');
    });

    // Scroll back to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
