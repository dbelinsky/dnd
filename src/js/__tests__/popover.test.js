const { setupPopover } = require('../app');

describe('Interaction with DOM Test', () => {
  let toggleButton;
  let popover;

  beforeEach(() => {
    toggleButton = document.createElement('button');
    toggleButton.id = 'toggleButton';
    document.getElementById = jest.fn().mockImplementation((id) => {
      if (id === 'toggleButton') {
        return toggleButton;
      } if (id === 'myPopover') {
        return popover;
      }
      return null;
    });

    popover = document.createElement('div');
    popover.id = 'myPopover';
    popover.style.display = 'none';

    Element.prototype.getBoundingClientRect = jest.fn().mockImplementation(() => ({
      top: 100,
      left: 200,
      height: 50,
    }));

    setupPopover();
  });

  test('Popover toggles visibility and position on button click', () => {
    toggleButton.click();

    expect(popover.style.display).toBe('block');

    expect(popover.style.top).toBe('95px'); // 100 - 50 - 5
    expect(popover.style.left).toBe('200px');
  });
});
