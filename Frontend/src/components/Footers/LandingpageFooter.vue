<template>
  <footer class="footer">
    <!-- Welle oben -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      class="wave"
    >
      <path
        fill="#006051"
        d="M0,288L9.6,256C19.2,224,38,160,58,138.7C76.8,117,96,139,115,160C134.4,181,154,203,173,181.3C192,160,211,96,230,96C249.6,96,269,160,288,186.7C307.2,213,326,203,346,192C364.8,181,384,171,403,181.3C422.4,192,442,224,461,245.3C480,267,499,277,518,250.7C537.6,224,557,160,576,154.7C595.2,149,614,203,634,240C652.8,277,672,299,691,266.7C710.4,235,730,149,749,128C768,107,787,149,806,144C825.6,139,845,85,864,85.3C883.2,85,902,139,922,170.7C940.8,203,960,213,979,186.7C998.4,160,1018,96,1037,74.7C1056,53,1075,75,1094,96C1113.6,117,1133,139,1152,128C1171.2,117,1190,75,1210,58.7C1228.8,43,1248,53,1267,101.3C1286.4,149,1306,235,1325,256C1344,277,1363,235,1382,229.3C1401.6,224,1421,256,1430,272L1440,288L1440,320L0,320Z"
      />
    </svg>

    <!-- Inhalt -->
    <div class="footer-content">
      <div class="footer-section">
        <h3>About Us</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          molestiae autem hic asperiores et?
        </p>
      </div>

      <div class="footer-section">
        <h3>Links</h3>
        <ul>
          <li><a href="#">Features</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Legal Notice</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>Contact</h3>
        <p>Email: info@budget-buddy.com</p>
        <p>Tel: +49 123 456789</p>
      </div>
    </div>

    <div class="footer-bottom">
      © {{ new Date().getFullYear() }} Budget-Buddy AG. All rights reserved.
    </div>
  </footer>
</template>

<script lang="ts" setup></script>

<style scoped>
.footer {
  margin-top: 10vh;
  position: relative;
  background: #006051;
  color: #fff;
  padding-top: 80px;
}

.wave {
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  height: 100px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  padding: 2rem 3rem;
  max-width: 1100px;
  margin: 0 auto;
}

.footer-section h3 {
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
  color: #f1fdfb;
  text-transform: uppercase;
}

.footer-section p,
.footer-section li,
.footer-section a {
  color: #e8e8e8;
  font-size: 0.95rem;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-section a:hover {
  color: #fff;
}

.footer-bottom {
  text-align: center;
  font-size: 0.85rem;
  padding: 1rem;
  background: #004b3f;
  color: #d3d3d3;
}
</style>
