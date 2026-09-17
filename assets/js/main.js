/* ========================================
   Sportsurge.forum - Main JavaScript
   TOC Generator, FAQ Accordion, Mobile Nav
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {

  // --- Mobile Navigation Toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      this.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        navToggle.textContent = '☰';
      });
    });
  }

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-item h3').forEach(function(faqHeader) {
    faqHeader.addEventListener('click', function() {
      const item = this.parentElement;
      const isActive = item.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.faq-item').forEach(function(faq) {
        faq.classList.remove('active');
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // --- Auto-Generate Table of Contents ---
  const tocContainer = document.querySelector('.toc');
  if (tocContainer) {
    const headings = document.querySelectorAll('main h2[id]');
    if (headings.length > 0) {
      const tocList = tocContainer.querySelector('ul') || document.createElement('ul');
      tocList.innerHTML = '';

      headings.forEach(function(heading) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#' + heading.id;
        a.textContent = heading.textContent;
        li.appendChild(a);
        tocList.appendChild(li);
      });

      if (!tocContainer.querySelector('ul')) {
        tocContainer.appendChild(tocList);
      }
    }
  }

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // --- External Link Tracking ---
  document.querySelectorAll('a[target="_blank"]').forEach(function(link) {
    link.setAttribute('rel', 'noopener noreferrer');
  });

  // --- Active Nav Link ---
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-menu a').forEach(function(link) {
    if (link.getAttribute('href') === currentPath ||
        (currentPath === '/' && link.getAttribute('href') === '/')) {
      link.classList.add('active');
    }
  });

});
