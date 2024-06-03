<template>
  <el-card style="max-width: 100%">
    <div class="goodsList" v-loading="tableLoading" :class="[sizeObj.textSize]">
      <el-card class="goods" :style="goodsSize" v-for="(item, index) in data" :key="index">
        <div class="goods-info">
          <div class="name">
            {{ item.name }}
          </div>
          <div class="price">
            {{ item.price }}元
          </div>
        </div>
        <div class="goods-img">
          <img :src="item.imgUrl">
        </div>
        <div class="goods-button">
          <el-button type="primary" :size="sizeObj.btnSize" @click="pushCar(item)">加入购物车</el-button>
        </div>
        <div class="goods-times" :style="goodsTimes">
          {{ item.count }}
        </div>
      </el-card>
    </div>

    <div class="mt-5">
      <el-pagination class="flex justify-center items-center" background layout="prev, pager, next"
        :current-page="currentPage" :page-count="pageMax" @update:current-page="changePage" />
    </div>
  </el-card>

  <div class="car-icon" @click="displayCar">
    <el-icon :size="sizeObj.iconSize">
      <ShoppingCartFull />
    </el-icon>
  </div>

  <el-drawer style="background:linear-gradient(to right top, rgb(79, 169, 214), rgb(132, 223, 159)) !important;"
    v-model="drawerRef" title="编辑" direction="btt" size="500px">
    <div class="car-goods" v-for="(item, index) in carGoods" :key="index">
      <div class="car-goods-info" :class="sizeObj.textSize" style="width:90%;">
        <div class="car-goods-name" style="width: 20%;">
          {{ item.name }}
        </div>
        <div>
          <div>
            数量
            <el-input-number class="ml-2" :size="sizeObj.btnSize" v-model="item.count" :min="0"
              @change="handleCountChange(item)" />
          </div>
        </div>
        <div style="width: 20%;">
          总价 {{ item.totalPrice }}元
        </div>

      </div>
    </div>
    <div class="flex justify-center items-center" key="btn" style="width: 100%;">
      <el-button class="buy-button mt-1" type="primary" @click="handelBuyGoods">
        购买
      </el-button>
    </div>
  </el-drawer>
</template>

<script setup>
import { reactive, onMounted, onBeforeMount, ref } from "vue"
import { toast } from "~/composables/util.js"
import { getGoods } from "~/api/user.js";
import { buyGoods } from "~/api/user.js";
import { useCommonTable } from "~/composables/useCommonTable.js"
import { useResize } from "~/composables/useResize.js"

const {
  data,
  tableLoading,
  drawerRef,
  pageMax,
  currentPage,
  handelGetGoods,
  changePage
} = useCommonTable({
  getList: getGoods,
})

const goodsSize = reactive({
  height: "",
  width: "",
  mobile: "50vw",
  computer: "35vh"
})
const goodsTimes = reactive({
  height: "",
  width: "",
  mobile: "30px",
  computer: "34px"
})
const {
  sizeObj,
  handleResize
} = useResize({
  item: goodsSize,
  corner: goodsTimes,
})
const carGoods = ref([])

const pushCar = (item) => {
  let dataItem = data.value.find(goods => goods.id === item.id);
  dataItem.count = (dataItem.count || 0) + 1;
  // 查找购物车中是否已经存在该商品
  const existingItem = carGoods.value.find(goods => goods.id === item.id)
  // 如果存在,则增加数量
  if (existingItem) {
    existingItem.count++
    existingItem.totalPrice = existingItem.price * existingItem.count;
  } else {
    const newItem = { ...item, count: 1, totalPrice: item.price }
    carGoods.value.push(newItem);
  }
}

const handleCountChange = (item) => {
  carGoods.value = carGoods.value.filter((item) => item.count > 0)
  //同步数据
  data.value.forEach(goods => {
    if (goods.id === item.id) {
      goods.count = item.count
      const existingItem = carGoods.value.find(goods => goods.id === item.id)
      existingItem.totalPrice = existingItem.price * existingItem.count
    }
  })
}

const displayCar = () => {
  if (carGoods.value.length > 0) {
    drawerRef.value = !drawerRef.value
  } else {
    toast("购物车为空", "warning")
  }
}

const handelBuyGoods = async () => {
  buyGoods(carGoods.value)
    .then(async (res) => {
      toast("购买成功")
      carGoods.value = []
      await new Promise(resolve => setTimeout(resolve, 300))
      drawerRef.value = false
      const promises = data.value.map((item) => {
        const { count } = item
        return new Promise((resolve) => {
          const interval = setInterval(() => {
            if (item.count > 0) {
              item.count--
            }
            if (item.count === 0) {
              clearInterval(interval)
              resolve()
            }
          }, 80)
        })
      })
      await Promise.all(promises)
    })
    .catch(err => {
      toast("购买失败", "error")
    })
}

onMounted(async () => {
  // 监听窗口resize事件
  window.addEventListener('resize', handleResize);
  await handelGetGoods(true)
  handleResize()
})
onBeforeMount(() => {
  window.removeEventListener("resize", handleResize)
})
</script>

<style scoped>
  :deep(.el-card__body) {
    height: 100%;
    width: 100%;
  }

  .goodsList {
    @apply flex items-center justify-center;
    flex-wrap: wrap;
  }

  .goods {
    @apply flex relative flex-col justify-start items-center;
    border: 1px dotted rgba(128, 155, 131, 0.516);
    margin: 2vw;
    background:
      linear-gradient(rgba(121, 211, 227, 0.543), rgba(61, 133, 221, 0.479));
    box-sizing: border-box;
    border-radius: 15px;
  }

  .goods-info {
    @apply flex justify-between;
    width: 100%;
    height: 20%;
    margin-bottom: 5px
  }

  .goods-info .name {
    @apply inline-block;
    color: rgb(92, 98, 188);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: auto;
  }

  .goods-info .price {
    color: rgb(186, 76, 46);
  }

  .goods-img {
    height: 60%;
    width: auto;
  }

  .goods-img img {
    @apply pb-1;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .goods-button {
    @apply flex justify-center items-center;
    position: absolute;
    height: 25%;
    left: 50%;
    right: 50%;
  }

  .goods-times {
    @apply absolute flex justify-center items-center;
    bottom: 0px;
    right: 0px;
    color: rgba(217, 22, 181, 0.829);
    background-color: rgba(202, 213, 241, 0.53);
    border: 1px solid rgb(185, 98, 98);
    border-radius: 50%;

  }


  .car-icon {
    @apply fixed;
    right: 5vw;
    bottom: 200px;
    z-index: 100;
  }

  .car-goods {
    @apply flex justify-center items-center my-3 pb-2;
    width: 100%;
    border-bottom: 1px solid rgb(134, 93, 174);
    box-sizing: border-box;
  }

  .car-goods-info {
    @apply flex items-center justify-between space-x-2;
  }

  .car-goods-name {
    @apply inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: auto;
  }


  .buy-button {
    @apply text-light-300 hover:text-red-900 !important;
  }

</style>