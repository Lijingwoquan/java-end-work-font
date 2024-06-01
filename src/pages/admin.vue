<template>
    <el-card style="max-width: 100%">
        <div class="flex justify-end mb-5">
            <el-button type="primary" size="large" @click="openRrawer()">新增</el-button>
        </div>
        <el-table :data="data" stripe style="width: 100%">
            <el-table-column prop="name" label="商品名称" />

            <el-table-column prop="price" label="商品价格">
                <template #default="scope">
                    <div class="flex items-center text-lg" style="height: 100%;width: 100%;color: rgb(48, 48, 169);">
                        {{ scope.row.price }}
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
            <el-table-column prop="name" label="删除" width="150px">
                <template #default="scope">
                    <span @click.stop="() => { }">
                        <el-popconfirm title="是否要删除该管理员?" confirm-button-text="确定" cancel-button-text="取消"
                            @confirm="handelDelete(scope.row)">
                            <template #reference>
                                <el-button type="primary" size="default" @click="">删除商品</el-button>
                            </template>
                        </el-popconfirm>
                    </span>
                </template>
            </el-table-column>
        </el-table>
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
import { onMounted, reactive, ref } from "vue"
import {
    addGoods,
} from "~/api/manager.js";
import {
    getGoods,
} from "~/api/common.js";

import { toast } from "~/composables/util.js"


const data = ref([])

const form = reactive({
    name: "",
    price: 0,
    imgUrl: "",
    id: 0
})


const defaultForm = reactive({
    name: "",
    price: 0,
    imgUrl: "",
    id: 0
})


const formRef = ref(null)
const drawerRef = ref(false)

const handelDelete = (item) => {
    data.value = data.value.filter((goods) => goods.id !== item.id)
}

const openRrawer = (goods) => {
    drawerRef.value = true
    if (goods) {
        Object.assign(form, goods);
    } else {
        for (const key in defaultForm) {
            form[key] = defaultForm[key]
        }
    }
}

const onSubmit = () => {

}

onMounted(() => {
    getGoods().then(res => {
        toast("添加商品成功", "success")
        data.value = res.data.msg
    }).catch(err => {
        toast("添加商品失败", "error")
    })
})
</script>

<style scoped>

    .goods-img {
        height: 150px;
        width: auto;
    }

    .goods-img img {
        @apply pb-1;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
</style>
