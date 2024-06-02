import { reactive, ref } from "vue"
import { toast } from "~/composables/util.js"
export function useCommonTable(opt = {}) {
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
    const tableLoading = ref(true)
    const submitType = ref("new")
    const formRef = ref(null)
    const drawerRef = ref(false)
    const pageMax = ref(0)
    const currentPage = ref(1)
    const handelDelete = (item) => {
        tableLoading.value = true
        opt.delate(item.id)
            .then(() => {
                toast("删除成功")
            }).catch(() => {
                toast("删除失败", "error")
            }).finally(() => {
                handelGetGoods()
                tableLoading.value = false
            })
    }
    const handelGetGoods = async (flag) => {
        tableLoading.value = true
        data.value = []
        await setTimeout(() => {
            opt.getList().then(res => {
                if (flag) {
                    toast("加载成功")
                }
                res.data.carGoodsList.forEach((goods) => {
                    if (goods.page === currentPage.value) {
                        data.value.push(goods)
                    }
                })
                pageMax.value = res.data.maxPage
            }).catch(() => {
                toast("加载失败", "error")
            }).finally(() => {
                tableLoading.value = false
                drawerRef.value = false
            })
        }, 500);

    }
    const openRrawer = (goods) => {
        drawerRef.value = true
        submitType.value = "new"
        if (goods) {
            Object.assign(form, goods);
            submitType.value = "update"
        } else {
            for (const key in defaultForm) {
                form[key] = defaultForm[key]
            }
        }

    }

    const onSubmit = async () => {
        if (submitType.value === "update") {
            await opt.update(form).then(res => {
                toast("修改成功")
            }).catch(() => {
                toast("修改失败", "error")
            })
        } else {
            await opt.add(form).then(res => {
                toast("添加成功")
            }).catch(() => {
                toast("添加失败", "error")
            })
        }
        handelGetGoods()
    }

    const changePage = (page) => {
        currentPage.value = page
        handelGetGoods()
    }
    return {
        data,
        form,
        defaultForm,
        tableLoading,
        submitType,
        formRef,
        drawerRef,
        pageMax,
        currentPage,
        handelDelete,
        handelGetGoods,
        openRrawer,
        onSubmit,
        changePage
    }
}