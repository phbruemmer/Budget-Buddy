<template>
  <div class="protected" v-if="show_page">
    <div class="header-menu">
      <div class="menu">
        <Hamburger @open="openMenu = true" @close="openMenu = false" />
        <h1 class="title">Good evening!</h1>
      </div>
    </div>

    <hr />

    <div class="section-container">
      <div class="project-section">
        <div class="project-btn">
          <DefaultButton :dotted="true" @button="createNewProject">
            Add Project
          </DefaultButton>
          <DefaultButton :dotted="true">Import Project</DefaultButton>
        </div>

        <div class="project-container">
          <div class="project-header">
            <a
              class="selection"
              :class="{ selected: selectedProjectTab === 'recent' }"
              @click.prevent="selectTab('recent')"
            >
              Recent
            </a>
            <a
              class="selection"
              :class="{ selected: selectedProjectTab === 'favorites' }"
              @click.prevent="selectTab('favorites')"
            >
              Favorites
            </a>
            <a
              class="selection"
              :class="{ selected: selectedProjectTab === 'shared' }"
              @click.prevent="selectTab('shared')"
            >
              Shared with Me
            </a>
          </div>

          <div class="project-body">
            <div class="project-body">
              <table>
                <thead>
                  <tr>
                    <th>Nr</th>
                    <th>Name</th>
                    <th>Date Modified</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Project A</td>
                    <td>2025-11-12</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Project B</td>
                    <td>2025-11-10</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Project C</td>
                    <td>2025-11-08</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <SideMenu :show="openMenu">
      <DefaultButton color="#fff" :dotted="true">Account</DefaultButton>
      <DefaultButton color="#fff" :dotted="true">New Project</DefaultButton>
      <DefaultButton color="#fff" :dotted="true">Templates</DefaultButton>
      <DefaultButton color="#fff" :dotted="true">Help</DefaultButton>
    </SideMenu>

    <LandingpageFooter />
  </div>
</template>

<script lang="ts" setup>
import { std_api_request } from "../utils/api";
import { onMounted, ref } from "vue";

import Hamburger from "../components/Default Buttons/Hamburger.vue";
import DefaultButton from "../components/Default Buttons/DefaultButton.vue";
import SideMenu from "../components/Modals/SideMenu.vue";

import LandingpageFooter from "../components/Footers/LandingpageFooter.vue";

type SelectedProjectTabs = "recent" | "favorites" | "shared";

const show_page = ref<boolean>(false);
const openMenu = ref<boolean>(false);

const selectedProjectTab = ref<SelectedProjectTabs>("recent");

const selectTab = (tab: SelectedProjectTabs) => {
  selectedProjectTab.value = tab;
};

const createNewProject = () => {
  // Loading Screen
  // Switch page to editor
};

onMounted(async () => {
  const access_token = localStorage.getItem("access_token");
  if (!access_token) window.location.href = "/";

  const response = await std_api_request(
    "/api/auth/auto-login/",
    "GET",
    {},
    true
  );
  if (response.ok) show_page.value = true;
  else window.location.href = "/";
});
</script>

<style scoped>
.header-menu {
  position: relative;
  margin: 2vh;
}

.menu {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.menu > *:first-child {
  position: absolute;
  left: 0;
}

.title {
  font-family: "Supreme-Bold";
  margin: 0;
  text-align: center;
  flex: 1;
}

.project-btn {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 4vh 0;
}

.project-container {
  min-height: 50vh;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 24px;
}

.project-header {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
  width: 100%;
}

.selection {
  margin: 0 2vw;
  color: #333;
  transition: all 0.1s ease;
}

.selection:hover {
  transform: scale(1.05);
  cursor: pointer;
  color: #444;
}

.selected {
  text-decoration: underline;
}

.project-body {
  margin: 2vh;
}

.project-body table {
  width: 100%;
  border-collapse: collapse;
}

.project-body th,
.project-body td {
  text-align: center;
  padding: 10px 0;
}

.project-body tbody tr {
  border-bottom: 1px solid #ddd;
  border-radius: 12px;
}

.project-body tbody tr:hover {
  background: #00000010;
  cursor: pointer;
}

.project-body thead tr {
  border-bottom: 2px solid #ccc;
  border-radius: 12px;
}

.project-body th {
  font-weight: 600;
}
</style>
