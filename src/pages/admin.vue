<template>
    <el-card style="max-width: 100%">
        <div class="flex justify-end mb-5">
            <div>
                <el-button type="primary" size="large" @click="handelCreate">新增</el-button>
            </div>
        </div>
        <el-table :data="data" stripe style="width: 100%" v-loading="tableLoading">
            <el-table-column prop="name" label="商品名称">
                <template #default="scope">
                    <div class="table-name">
                        {{ scope.row.name }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="price" label="商品价格">
                <template #default="scope">
                    <div class="table-price">
                        {{ scope.row.price }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="count" label="商品销量">
                <template #default="scope">
                    <div class="table-count">
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
                    <el-button type="primary" size="default" @click="handelUpdate(scope.row)">编辑商品</el-button>
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
    <el-drawer v-model="drawerRef" :title="drawerTitle" :destroy-on-close="true" direction="rtl"
        :size="drawerSize.width">
        <div class="flex flex-col justify-between" style="height: 100%;">
            <el-form :model="form" ref="formRef" label-width="auto" class="space-y-10" :rules="rules">
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="商品价格" prop="price">
                    <el-input-number :min="1" v-model="form.price" />
                </el-form-item>
                <el-form-item label="商品图片" prop="imgUrl">
                    <el-upload :action="uploadImgApi" class="avatar-uploader" name="img" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <el-button class="bottom-0" type="primary" size="large" @click="handelSubmit"
                style="width: 100%;">确定</el-button>
        </div>
    </el-drawer>
</template>

<script setup>
import { reactive, onMounted, onBeforeMount, ref } from "vue"
import { getGoods } from "~/api/manager.js"
import { toast } from "~/composables/util.js"
import {
    addGoods,
    updateGoods,
    changeGoodsStatus,
} from "~/api/manager.js";
import {
    useInitTable,
    useInitForm
} from "~/composables/useCommonTable.js"
import { useResize } from "~/composables/useResize.js"
import {
    uploadImgApi,
    staticImg
} from "/config";
// table
const {
    data,
    imageUrl,
    tableLoading,
    pageMax,
    currentPage,
    handelChangeStauts,
    getData,
    changePage,
} = useInitTable({
    getList: getGoods,
    changeStatus: changeGoodsStatus
})

// form
const {
    form,
    formRef,
    drawerRef,
    rules,
    drawerTitle,
    handelCreate,
    handelUpdate,
    handelSubmit
} = useInitForm({
    form: reactive({
        name: "",
        price: 0,
        imgUrl: "",
        id: 0
    }),
    getData: getData,
    create: addGoods,
    update: updateGoods,
    rules: {
        name: [{
            required: true,
            message: "商品名称不能为空",
            tirgger: "blur"
        }],
        imgUrl: [{
            required: true,
            message: "商品图片不能为空",
            tirgger: "blur"
        }],
    }
})

const tableColumn = reactive({
    height: "",
    width: "",
    mobile: "150px",
    computer: "200px"
})

const drawerSize = reactive({
    height: "",
    width: "",
    mobile: "300px",
    computer: "500px"
})

const {
    handleResize: handleResizex,
} = useResize({
    item: drawerSize,
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
    toast("上传图片成功")
}

const beforeAvatarUpload = (rawFile) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(rawFile.type)) {
        toast("上传文件格式必须为jpeg, png或gif", "error");
        return false;
    } else if (rawFile.size / 1024 / 1024 > 5) {
        toast("上传文件大小必须小于5MB", "error");
        return false;
    }
    return true
}

const onKeyUp = (e) => {
    if (e.key == "Enter") {
        searchMsg()
    }
}

onMounted(() => {
    getData(true)
    handleResize()
    handleResizex()
    window.addEventListener('resize', handleResize);
    window.addEventListener("resize", handleResizex)
    document.addEventListener("keyup", onKeyUp)
})

onBeforeMount(() => {
    window.removeEventListener("resize", handleResize)
    window.removeEventListener("resize", handleResizex)
    document.removeEventListener("keyup", onKeyUp)
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
    .table-name {
        font-weight: 500;
        text-shadow: 3px 3px 3px rgba(39, 142, 187, 0.5);
        font-size: 16px;
        color: rgb(71, 108, 183);
    }

    .table-price {
        font-weight: 600;
        text-shadow: 3px 3px 3px rgba(55, 98, 192, 0.5);
        color: rgb(84, 111, 164);
        font-size: 16px;
    }

    .table-count {
        font-weight: 700;
        background: linear-gradient(to bottom, rgba(88, 121, 186, 0.82), rgb(148, 139, 93), rgba(35, 65, 199, 0.532));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 16px;
    }


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