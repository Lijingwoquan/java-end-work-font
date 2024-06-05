<template>
    <div class="Headercontainer">
        <div class="left">
            <el-icon class="logoHouse" @click="changePage" :size="sizeObj.iconSize">
                <component :is="icon">
                </component>
            </el-icon>

        </div>

        <div class="middle">
            <span :class="sizeObj.textSize">简易购物车管理系统</span>
        </div>

        <div class="right">
          
            <el-dropdown>
                <div class="help">
                    <div class="text">帮助</div>
                    <el-icon class="icon" :size="sizeObj.iconSize">
                        <arrow-down />
                    </el-icon>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>
                            <el-link type="primary" :underline="false" href="https://github.com/Lijingwoquan"
                                target="_blank">联系作者</el-link>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>


<script setup>
import { reactive, onMounted, onBeforeMount, computed, watch, ref } from "vue"
import { useRouter, useRoute } from 'vue-router';


const router = useRouter()
const route = useRoute()

const icon = ref("User")
const pageRoute = ref("/admin")

watch(
    () => route.path,
    () => {
        pageRoute.value = "/admin"
        icon.value = "User"
        if (route.path == "/admin") {
            pageRoute.value = "/"
            icon.value = "Hide"
        }
    }
)

const changePage = () => {
    router.push(pageRoute.value)
}

const sizeObj = reactive({
    textSize: "",
    iconSize: ""
})

const handleResize = () => {
    const windowWidth = window.innerWidth
    if (windowWidth < 768) {
        sizeObj.iconSize = "16px"
        sizeObj.textSize = "text-md"
    } else {
        sizeObj.iconSize = "25px"
        sizeObj.textSize = "text-lg"
    }
}
onMounted(() => {
    // 监听窗口resize事件
    window.addEventListener('resize', handleResize);
    handleResize()
})

//移除键盘监听
onBeforeMount(() => {
    window.removeEventListener("resize", handleResize)
})
</script>

<style scoped>
    .Headercontainer {
        @apply flex justify-between items-center fixed top-0 left-0 right-0;
        z-index: 100;
        height: 60px;
        background:

            linear-gradient(to right, rgba(42, 157, 202, 0.365), rgba(0, 255, 0, 0.457), rgba(255, 192, 203, 0.47), rgba(0, 255, 255, 0.53));
    }

    .Headercontainer .left {
        @apply flex justify-start items-center;
        width: 65px;
        margin-right: 0;
    }


    .Headercontainer .left .logoHouse {
        @apply text-xl mx-3 hover:cursor-pointer;
        height: auto;
    }

    .Headercontainer .left .logoExpand {
        @apply text-xl hover:cursor-pointer;
        height: auto;
    }

    .Headercontainer .middle {
        @apply text-sm font-bold font-serif;
        padding-left: 10%;
        white-space: nowrap;
    }

    .Headercontainer .right {
        @apply flex justify-end items-center left-0 right-0;
        width: 100px;
    }


    .Headercontainer .right .help {
        @apply flex justify-center items-center mr-1 hover:cursor-pointer;
        height: 25px;
    }

    .Headercontainer .right .help .text {
        width: 30px;
    }

    .Headercontainer .right .help .icon {
        @apply mr-2;
    }

    .Headercontainer .right .search:hover {
        border-color: red;
        /* 悬停时改变边框颜色 */
    }


    .input {
        height: 50px;
    }

    .essayList {
        @apply flex justify-between items-center;
        background-color: rgba(107, 95, 175, 0.168);
        width: 100%;
        height: 50px;
    }

    :deep(.el-dialog__header) {
        padding: 0px !important;
        padding-bottom: 0px !important;
        margin-right: 0px !important;
    }


    :deep(.el-drawer__body) {
        padding: 0 !important;
        margin: 0 !important;
    }

    :deep(.el-menu) {
        width: 200px !important;
        background:
            linear-gradient(to top, rgba(177, 167, 224, 0.2), rgba(157, 169, 224, 0.2));
    }

    :deep(.el-drawer__header) {
        @apply flex justify-center items-center;
        background:
            linear-gradient(to left, rgb(132, 223, 159), rgb(79, 169, 214));
        margin: 0px !important;
        padding: 10px !important;
        box-sizing: border-box;
        height: 60px;
    }
</style>