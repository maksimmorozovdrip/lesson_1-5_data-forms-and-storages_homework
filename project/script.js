const createButton = document.querySelector('[data-action="create"]');
const editButton = document.querySelector('[data-action="edit"]');
const deleteButton = document.querySelector('[data-action="delete"]');
const cancelButton = document.querySelector('[data-action="cancel"]');
const form = document.querySelector('form');
const emptySection = document.querySelector('[data-state-panel="empty"]');
const editorSection = document.querySelector('[data-state-panel="editor"]');
const viewerSection = document.querySelector('[data-state-panel="viewer"]');
 
function showState(state) {
  emptySection.hidden = state !== 'empty';
  editorSection.hidden = state !== 'editor';
  viewerSection.hidden = state !== 'viewer';
}

createButton.addEventListener('click', () => {
  form.reset();
  showState('editor');
});

cancelButton.addEventListener('click', () => {
  showState('empty');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const card = {
    missionName: formData.get('missionName'),
    spaceAgency: formData.get('spaceAgency'),
    launchDate: formData.get('launchDate'),
    target: formData.get('target'),
    status: formData.get('status'),
    description: formData.get('description'),
  };

  console.log(card);
});