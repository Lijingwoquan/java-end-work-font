<template>
  <div class="background-color"></div>
  <el-container>
    <el-header>
      <NavHeader></NavHeader>
    </el-header>
    <el-main>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </el-main>
  </el-container>

  <!-- <div style="width: 100%;">
    <footer class="register">
      <a class="text-sm" target="_blank" href="https://github.com/Lijingwoquan">© 2024 罹景偓佺的博客 By 罹景.本站博客未经授权禁止转载.
      </a>
      <a class="text-sm" target="_blank" href="https://beian.miit.gov.cn/#/Integrated/index">备案信息:湘ICP备2024043210号.</a>
    </footer>
  </div> -->
</template>


<script setup>
import NavHeader from "~/components/NavHeader.vue"

</script>

<style>

  /* Webkit浏览器样式 */
  ::-webkit-scrollbar {
    /* 滚动条的宽度 */
    width: 1px;
    /* 设置滚动条高度，以模拟底部滚动条 */
    height: 1px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #eee9e9;
    /* 滚动条拖动块的颜色 */
  }

  /* IE浏览器样式 */
  ::-ms-scrollbar {
    /* 滚动条的宽度 */
    width: 1px;
    /* 设置滚动条高度，以模拟底部滚动条 */
    height: 1px;
  }

  ::-ms-scrollbar-thumb {
    background-color: #eee9e9;
    /* 滚动条拖动块的颜色 */
  }

  .register {
    @apply flex flex-col justify-center items-center italic mt-10 mb-5;
  }

  .background-color {
    position: fixed;
    top: 60px;
    height: calc(100vh - 60px);
    width: 100vw;
    background: linear-gradient(to right bottom, rgba(180, 174, 206, 0.1), rgba(137, 155, 231, 0.15));
    z-index: 10;
    pointer-events: none;
  }
</style>
