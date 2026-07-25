/* ==========================================================================
   PREMIUM BIOGRAPHY ONE-PAGE INTERACTIVITY ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DEFAULT PROFILE DATA SYSTEM
  const defaultProfileData = {
    name: 'Hasan Kerim Moral',
    role: 'Kıdemli Yazılım Mimarı & Dijital Ürün Tasarımcısı',
    bio: 'Sakarya Anadolu Lisesi mezunu olarak temel fen ve analitik disiplinlerle başladığım teknoloji serüvenime, yüksek performanslı web sistemleri, yapay zekâ entegrasyonları ve estetik dijital çözümler üreterek devam ediyorum.',
    email: 'hasan.kerim@example.com',
    location: 'İstanbul / Türkiye (Uzaktan & Hibrit)',
    status: 'Yeni Proje & İşbirliklerine Açık'
  };

  let profileData = { ...defaultProfileData };

  // Clear obsolete old cache if old single name 'Hasan' was stored
  const savedProfile = localStorage.getItem('hasan_biography_profile_v2');
  if (savedProfile) {
    try {
      profileData = JSON.parse(savedProfile);
    } catch (e) {
      console.error('Failed to parse saved profile:', e);
    }
  }

  // 2. RENDER PROFILE DATA
  function renderProfile() {
    document.getElementById('navName').textContent = profileData.name;
    document.getElementById('heroName').textContent = profileData.name;
    document.getElementById('heroBio').textContent = profileData.bio;
    document.getElementById('profileStatus').textContent = profileData.status;
    document.getElementById('contactEmail').textContent = profileData.email;
    document.getElementById('contactLocation').textContent = profileData.location;
    document.getElementById('footerName').textContent = profileData.name;
    document.getElementById('quoteAuthor').textContent = `— ${profileData.name}`;

    // Update modal inputs
    document.getElementById('inputEditName').value = profileData.name;
    document.getElementById('inputEditRole').value = profileData.role;
    document.getElementById('inputEditBio').value = profileData.bio;
    document.getElementById('inputEditEmail').value = profileData.email;
    document.getElementById('inputEditLocation').value = profileData.location;
  }

  renderProfile();

  // 3. TYPING EFFECT FOR HERO ROLE
  const roles = [
    profileData.role,
    'Yapay Zekâ Entegratörü',
    'Full-Stack Mühendis',
    'Kullanıcı Deneyimi Tasarımcısı'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedRoleElement = document.getElementById('typedRole');

  function typeEffect() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typedRoleElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedRoleElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
      speed = 2200; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 400;
    }

    setTimeout(typeEffect, speed);
  }
  typeEffect();

  // 4. MOUSE FOLLOWER AURA GLOW
  const mouseFollower = document.getElementById('mouseFollower');
  window.addEventListener('mousemove', (e) => {
    mouseFollower.style.left = `${e.clientX}px`;
    mouseFollower.style.top = `${e.clientY}px`;
  });

  // 5. NAVBAR SCROLL & ACTIVE SPY
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.background = 'rgba(9, 13, 22, 0.95)';
      navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    } else {
      navbar.style.background = 'var(--bg-nav)';
      navbar.style.boxShadow = 'none';
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 6. THEME SWITCHER
  const themeBtn = document.getElementById('themeBtn');
  const themeMenu = document.getElementById('themeMenu');
  const themeOptions = document.querySelectorAll('[data-theme-set]');

  themeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    themeMenu.classList.toggle('active');
  });

  document.addEventListener('click', () => {
    themeMenu.classList.remove('active');
  });

  themeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const theme = opt.getAttribute('data-theme-set');
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('hasan_biography_theme', theme);
      showToast(`Tema değiştirildi: ${theme.toUpperCase()}`);
    });
  });

  // Restore Theme
  const savedTheme = localStorage.getItem('hasan_biography_theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  // 7. TIMELINE FILTERS
  const tabBtns = document.querySelectorAll('.tab-btn');
  const timelineItems = document.querySelectorAll('.timeline-item');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      timelineItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
          setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'translateY(0)'; }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => { item.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // 8. CONTACT FORM SUBMISSION
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const senderName = document.getElementById('senderName').value;
    showToast(`Teşekkürler Sayın ${senderName}! Mesajınız başarıyla iletildi.`);
    contactForm.reset();
  });

  // 9. LIVE PROFILE EDIT MODAL
  const openEditModalBtn = document.getElementById('openEditModalBtn');
  const closeEditModalBtn = document.getElementById('closeEditModalBtn');
  const editModal = document.getElementById('editModal');
  const editProfileForm = document.getElementById('editProfileForm');
  const resetProfileBtn = document.getElementById('resetProfileBtn');

  openEditModalBtn.addEventListener('click', () => {
    editModal.classList.add('active');
  });

  closeEditModalBtn.addEventListener('click', () => {
    editModal.classList.remove('active');
  });

  editModal.addEventListener('click', (e) => {
    if (e.target === editModal) editModal.classList.remove('active');
  });

  editProfileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    profileData.name = document.getElementById('inputEditName').value;
    profileData.role = document.getElementById('inputEditRole').value;
    profileData.bio = document.getElementById('inputEditBio').value;
    profileData.email = document.getElementById('inputEditEmail').value;
    profileData.location = document.getElementById('inputEditLocation').value;

    localStorage.setItem('hasan_biography_profile', JSON.stringify(profileData));
    renderProfile();
    editModal.classList.remove('active');
    showToast('Profil bilgileriniz canlı olarak güncellendi!');
  });

  resetProfileBtn.addEventListener('click', () => {
    if (confirm('Profil verilerini varsayılana sıfırlamak istediğinize emin misiniz?')) {
      profileData = { ...defaultProfileData };
      localStorage.removeItem('hasan_biography_profile');
      renderProfile();
      editModal.classList.remove('active');
      showToast('Profil varsayılan değerlere döndürüldü.');
    }
  });

  // 10. TOAST NOTIFICATION HELPER
  window.showToast = function(msg) {
    const toast = document.getElementById('toastNotification');
    const toastText = document.getElementById('toastText');
    toastText.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  };
});
