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

    <div style="width: 100%;">
        <footer class="register">
            <a class="text-sm" target="_blank" href="https://github.com/Lijingwoquan">© 2024 罹景偓佺的博客 By 罹景.本站博客未经授权禁止转载.
            </a>
            <a class="text-sm" target="_blank"
                href="https://beian.miit.gov.cn/#/Integrated/index">备案信息:湘ICP备2024043210号.</a>
        </footer>
    </div>
</template>