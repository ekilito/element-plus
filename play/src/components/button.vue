<template>
    <div class="flex flex-wrap items-center mb-4">
    <el-button size="large">Large</el-button>
    <el-button>Default</el-button>
    <el-button size="small">Small</el-button>
    <el-button size="large" :icon="Search">Search</el-button>
    <el-button :icon="Search">Search</el-button>
    <el-button size="small" :icon="Search">Search</el-button>
  </div>
</template>

<script setup></script>