const createButton = document.querySelector('[data-action="create"]');
const editButton = document.querySelector('[data-action="edit"]');
const deleteButton = document.querySelector('[data-action="delete"]');
const cancelButton = document.querySelector('[data-action="cancel"]');
const form = document.querySelector('form');
const emptySection = document.querySelector('[data-state-panel="empty"]');
const editorSection = document.querySelector('[data-state-panel="editor"]');
const viewerSection = document.querySelector('[data-state-panel="viewer"]');
const STORAGE_KEY = 'space-mission-card';
const DRAFT_KEY = 'space-mission-draft';
 
function showState(state) {
  emptySection.hidden = state !== 'empty';
  editorSection.hidden = state !== 'editor';
  viewerSection.hidden = state !== 'viewer';
}

createButton.addEventListener('click', () => {
  form.reset();
  clearDraft();
  showState('editor');
});

cancelButton.addEventListener('click', () => {
  showState('empty');
});


form.addEventListener('submit', (event) => {
  event.preventDefault();

    const card = getCardFromForm();

    saveCard(card);
    clearDraft();
    renderCard(card);
    showState('viewer');
});

form.addEventListener('input', () => {
  saveDraft();
});

editButton.addEventListener('click', () => {
  const card = loadCard();
  fillForm(card);
  showState('editor');
});

deleteButton.addEventListener('click', () => {
  removeCard();
  showState('empty');
});

cancelButton.addEventListener('click', () => {
    clearDraft();
  if (loadCard() === null) {
    showState('empty');
  } else {
    showState('viewer');
  }
});

function renderCard(card) {
  document.querySelector('[data-field="missionName"]').textContent = card.missionName;
  document.querySelector('[data-field="spaceAgency"]').textContent = card.spaceAgency;
  document.querySelector('[data-field="launchDate"]').textContent = card.launchDate;
  document.querySelector('[data-field="target"]').textContent = card.target;
  document.querySelector('[data-field="status"]').textContent = card.status;
  document.querySelector('[data-field="description"]').textContent = card.description;
}

function fillForm(card) {
  form.elements.missionName.value = card.missionName;
  form.elements.spaceAgency.value = card.spaceAgency;
  form.elements.launchDate.value = card.launchDate;
  form.elements.target.value = card.target;
  form.elements.status.value = card.status;
  form.elements.description.value = card.description;
}

function saveCard(card) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(card));
}

function loadCard() {
  const savedCard = localStorage.getItem(STORAGE_KEY);

  if (savedCard === null) {
    return null;
  }

  return JSON.parse(savedCard);
}

function removeCard() {
  localStorage.removeItem(STORAGE_KEY);
}
function getCardFromForm() {
  const formData = new FormData(form);

  return {
    missionName: formData.get('missionName'),
    spaceAgency: formData.get('spaceAgency'),
    launchDate: formData.get('launchDate'),
    target: formData.get('target'),
    status: formData.get('status'),
    description: formData.get('description'),
  };
}

function saveDraft() {
  sessionStorage.setItem(DRAFT_KEY, JSON.stringify(getCardFromForm()));
}

function loadDraft() {
  const savedDraft = sessionStorage.getItem(DRAFT_KEY);

  if (savedDraft === null) {
    return null;
  }

  return JSON.parse(savedDraft);
}

function clearDraft() {
  sessionStorage.removeItem(DRAFT_KEY);
}

const savedDraft = loadDraft();
const savedCard = loadCard();

if (savedDraft !== null) {
  fillForm(savedDraft);
  showState('editor');
} else if (savedCard !== null) {
  renderCard(savedCard);
  showState('viewer');
} else {
  showState('empty');
}

