const componentRoots = document.querySelectorAll('[data-component]');

const componentPath = (name) => `../components/${name}.html`;

const setActiveNavigation = (root) => {
  const activePage = root.dataset.active;
  if (!activePage) return;

  root.querySelectorAll(`[data-page="${activePage}"]`).forEach((link) => {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  });
};

const loadComponent = async (root) => {
  const name = root.dataset.component;
  if (!name) return;

  try {
    const response = await fetch(componentPath(name));
    if (!response.ok) {
      throw new Error(`Unable to load ${name}: ${response.status}`);
    }

    root.innerHTML = await response.text();
    setActiveNavigation(root);
  } catch (error) {
    console.error(error);
    root.setAttribute('data-component-error', name);
  }
};

await Promise.all(Array.from(componentRoots, loadComponent));
document.dispatchEvent(new CustomEvent('selah:components-loaded'));
