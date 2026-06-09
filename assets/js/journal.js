window.Selah.createAmbientBackground('bg', {
  pointCount: 52,
  alphaRange: 0.25,
  palette: { start: '#1a2f46', middle: '#203A58', end: '#355a78', glow: 'rgba(219,175,138,0.06)' },
  gradientWidth: 0.3,
  glowX: 0.75,
  glowY: 0.25,
  glowRadius: 0.42,
});

document.querySelectorAll('.type-btn').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.type-btn').forEach((typeButton) => typeButton.classList.remove('active'));
    button.classList.add('active');
  });
});

document.querySelectorAll('.entry-item').forEach((entry) => {
  entry.addEventListener('click', () => {
    document.querySelectorAll('.entry-item').forEach((entryButton) => entryButton.classList.remove('active'));
    entry.classList.add('active');

    const titleEl = document.getElementById('entry-title');
    if (titleEl) titleEl.value = entry.dataset.entryTitle || '';

    const dateEl = document.getElementById('entry-date-display');
    if (dateEl) dateEl.textContent = entry.dataset.fullDate || '';
  });
});

const newEntryButton = document.querySelector('[data-new-entry]');
if (newEntryButton) {
  newEntryButton.addEventListener('click', () => {
    document.querySelectorAll('.entry-item').forEach((entry) => entry.classList.remove('active'));
    const titleEl = document.getElementById('entry-title');
    if (titleEl) {
      titleEl.value = '';
      titleEl.focus();
    }
  });
}

document.querySelectorAll('.action-tag').forEach((tag) => {
  tag.addEventListener('click', () => tag.classList.toggle('active'));
});
