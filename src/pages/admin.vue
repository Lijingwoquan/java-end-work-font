<template>
    <el-card style="max-width: 100%">
        <div class="flex justify-end mb-5">
            <el-button type="primary" size="large" @click="openRrawer()">新增</el-button>
        </div>
        <el-table :data="data" stripe style="width: 100%" v-loading="tableLoading">
            <el-table-column prop="name" label="商品名称" />
            <el-table-column prop="price" label="商品价格">
                <template #default="scope">
                    <div class="flex items-center text-lg" style="height: 100%;width: 100%;color: rgb(48, 48, 169);">
                        {{ scope.row.price }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="count" label="商品销量">
                <template #default="scope">
                    <div class="flex items-center text-lg" style="height: 100%;width: 100%;color: rgb(48, 48, 169);">
                        {{ scope.row.count }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="imgUrl" label="商品图片" :min-width="tableColumn.width">
                <template #default="scope">
                    <div class="goods-img">
                        <img :src="scope.row.imgUrl">
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="编辑">
                <template #default="scope">
                    <el-button type="primary" size="default" @click="openRrawer(scope.row)">编辑商品</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="delete" label="状态">
                <template #default="scope">
                    <el-switch v-loading="tableLoading" :modelValue="scope.row.status" size="large" :active-value="1"
                        :inactive-value="0" @change="handelChangeStauts($event, scope.row.id)" />
                </template>
            </el-table-column>
        </el-table>
        <div class="mt-5">
            <el-pagination class="flex justify-center items-center" background layout="prev, pager, next"
                :current-page="currentPage" :page-count="pageMax" @update:current-page="changePage" />
        </div>
    </el-card>
    <el-drawer v-model="drawerRef" title="编辑" :destroy-on-close="true" direction="rtl" size="500px">
        <div class="flex flex-col justify-between" style="height: 100%;">
            <el-form :model="form" ref="formRef" label-width="auto" class="space-y-10">
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="商品价格" prop="price">
                    <el-input-number :min="1" v-model="form.price" />
                </el-form-item>
                <el-form-item label="商品图片" prop="imgUrl">
                    <el-upload :action="uploadImgApi" class="avatar-uploader" name="img" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <el-button class="bottom-0" type="primary" size="large" @click="onSubmit"
                style="width: 100%;">确定</el-button>
        </div>
    </el-drawer>


</template>

<script setup>
import { reactive, onMounted, onBeforeMount } from "vue"
import { getGoods } from "~/api/manager.js"
import { toast } from "~/composables/util.js"
import {
    addGoods,
    updateGoods,
    changeGoodsStatus,
} from "~/api/manager.js";
import { useCommonTable } from "~/composables/useCommonTable.js"
import { useResize } from "~/composables/useResize.js"
import {
    uploadImgApi,
    staticImg
} from "/config";
const {
    data,
    form,
    tableLoading,
    formRef,
    drawerRef,
    pageMax,
    currentPage,
    handelChangeStauts,
    handelGetGoods,
    openRrawer,
    onSubmit,
    changePage,
    imageUrl
} = useCommonTable({
    getList: getGoods,
    add: addGoods,
    update: updateGoods,
    changeStatus: changeGoodsStatus
})
const tableColumn = reactive({
    height: "",
    width: "",
    mobile: "150px",
    computer: "200px"
})
const {
    handleResize
} = useResize({
    item: tableColumn,
})

const handleAvatarSuccess = (
    response,
    uploadFile
) => {
    imageUrl.value = `${staticImg}${response.data.imgUrl}`
    form.imgUrl = imageUrl.value
}

const beforeAvatarUpload = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        toast("上传文件格式必须为image/jpeg", "error")
        return false
    } else if (rawFile.size / 1024 / 1024 > 5) {
        toast("上传文件大小必须小于5MB", "error")
        return false
    }
    return true
}

onMounted(() => {
    handelGetGoods(true)
    // 监听窗口resize事件
    window.addEventListener('resize', handleResize);
    handleResize()
})

onBeforeMount(() => {
    window.removeEventListener("resize", handleResize)
})

</script>

<style scoped>
    .goods-img {
        height: 150px;
        width: 150px;
    }

    .goods-img img {
        @apply pb-1;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .avatar-uploader .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .avatar-uploader img {
        @apply pb-1;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
</style>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader .el-upload:hover {
        border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
    }
</style>