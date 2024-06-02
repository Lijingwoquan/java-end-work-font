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
            <el-table-column prop="imgUrl" label="商品图片">
                <template #default="scope">
                    <div class="goods-img">
                        <img :src="scope.row.imgUrl">
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="编辑" width="150px">
                <template #default="scope">
                    <el-button type="primary" size="default" @click="openRrawer(scope.row)">编辑商品</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="delete" label="状态" width="150px">
                <template #default="scope">
                    <el-switch v-loading="tableLoading" :modelValue="scope.row.status" size="large" :active-value="0"
                        :inactive-value="1" @change="handelChangeStauts($event,scope.row.id)" />
                </template>
            </el-table-column>
        </el-table>
        <div class="mt-5">
            <el-pagination class="flex justify-center items-center" background layout="prev, pager, next"
                :current-page="currentPage" :page-count="pageMax" @update:current-page="changePage" />
        </div>
    </el-card>
    <el-drawer v-model="drawerRef" title="编辑" :destroy-on-close="true" direction="rtl" size="300px">
        <div class="flex flex-col justify-between" style="height: 100%;">
            <el-form :model="form" ref="formRef" label-width="auto" class="space-y-10">
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="商品价格" prop="price">
                    <el-input-number :min="1" v-model="form.price" />
                </el-form-item>
                <el-form-item label="商品图片" prop="imgUrl">
                    <el-input v-model="form.imgUrl" />
                </el-form-item>
            </el-form>
            <el-button class="bottom-0" type="primary" size="large" @click="onSubmit"
                style="width: 100%;">确定</el-button>
        </div>
    </el-drawer>
</template>

<script setup>
import { onMounted } from "vue"
import { getGoods } from "~/api/manager.js";
import {
    addGoods,
    updateGoods,
    changeGoodsStatus
} from "~/api/manager.js";
import { useCommonTable } from "~/composables/useCommonTable.js"

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
    changePage
} = useCommonTable({
    getList: getGoods,
    add: addGoods,
    update: updateGoods,
    changeStatus: changeGoodsStatus
})

onMounted(() => {
    handelGetGoods(true)
})
</script>

<style scoped>
    .goods-img {
        height: 200px;
        width: 200px;
    }

    .goods-img img {
        @apply pb-1;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
</style>
