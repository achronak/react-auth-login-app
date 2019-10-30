
let firstFocusableEl = '';
let lastFocusableEl = '';


export function trapFocus(e) {
    if (firstFocusableEl) {
        return;
    }
    var focusableEls = e.querySelectorAll('input[type="button"]:not([disabled])');
    firstFocusableEl = focusableEls[0];
    lastFocusableEl = focusableEls[focusableEls.length - 1];
    firstFocusableEl.focus();

    e.addEventListener('keydown', handleFocus);
}

export function resetTrapFocus(e) {
    e && e.removeEventListener('keydown', handleFocus);
    firstFocusableEl = '';
    lastFocusableEl = '';
}

export function handleFocus(el) {
    let isTabPressed = el.key === 'Tab';

    if (!isTabPressed) { 
        return; 
    }

    if ( el.shiftKey ) {
        if (document.activeElement === firstFocusableEl) {
            lastFocusableEl.focus();
            el.preventDefault();
        }
    } else {
        if (document.activeElement === lastFocusableEl) {
            firstFocusableEl.focus();
            el.preventDefault();
        }
    }

};