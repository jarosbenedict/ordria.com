/**
 * Ordria Landing — Minimal JS
 */

document.addEventListener('DOMContentLoaded', () => {
    initStickyBar();
    initCopyEmail();
    initStatsModal();
});

// Sticky bottom bar visibility
function initStickyBar() {
    const bar = document.getElementById('sticky-bar');
    const hero = document.querySelector('.hero');
    if (!bar || !hero) return;

    const observer = new IntersectionObserver(
        ([entry]) => {
            bar.classList.toggle('visible', !entry.isIntersecting);
        },
        { threshold: 0 }
    );
    observer.observe(hero);
}

// Copy email to clipboard
function initCopyEmail() {
    const btn = document.getElementById('copy-email');
    if (!btn) return;

    btn.addEventListener('click', async () => {
        const email = btn.dataset.email;
        const textSpan = btn.querySelector('span');
        const originalText = textSpan.textContent;

        try {
            await navigator.clipboard.writeText(email);
            btn.classList.add('copied');
            textSpan.textContent = 'Copied!';

            setTimeout(() => {
                btn.classList.remove('copied');
                textSpan.textContent = originalText;
            }, 2000);
        } catch (err) {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = email;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);

            btn.classList.add('copied');
            textSpan.textContent = 'Copied!';

            setTimeout(() => {
                btn.classList.remove('copied');
                textSpan.textContent = originalText;
            }, 2000);
        }
    });
}

// Stats methodology modal
function initStatsModal() {
    const learnMoreLink = document.getElementById('learn-more-link');
    const modal = document.getElementById('stats-modal');
    const closeBtn = document.getElementById('modal-close');

    if (!learnMoreLink || !modal) return;

    learnMoreLink.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
    });

    closeBtn?.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}
