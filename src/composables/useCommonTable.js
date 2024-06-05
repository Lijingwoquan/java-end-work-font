import { reactive, ref, computed } from "vue"
import { toast } from "~/composables/util.js"

// 列表 搜索 分页  修改状态
export function useInitTable(opt = {}) {
    const data = ref([])
    const imageUrl = ref('')
    const tableLoading = ref(true)
    const pageMax = ref(0)
    const currentPage = ref(1)
    const inputValue = ref("")

    const handelChangeStauts = (status, id) => {
        opt.changeStatus(id, status)
            .then(() => {
                toast("修改状态成功")
            }).catch(() => {
                toast("修改状态失败", "error")
            }).finally(() => {
                getData()
            })
    }

    const getData = async (flag) => {
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
            })
        }, 500);
    }

    const changePage = (page) => {
        currentPage.value = page
        getData()
    }

    return {
        data,
        imageUrl,
        tableLoading,
        pageMax,
        currentPage,
        handelChangeStauts,
        getData,
        changePage,
    }
}

// 新增 修改
export function useInitForm(opt = {}) {
    // 表单部分
    const form = reactive({})
    const formRef = ref(null)

    // 表单默认值
    const defaultForm = opt.form

    const drawerRef = ref(false)

    // 表单验证
    const rules = opt.rules || {}
    const editId = ref(0)
    const drawerTitle = computed(() => editId.value ? "修改" : "新增")

    // 提交表单
    const handelSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) return
            const fun = editId.value ? opt.update(form) : opt.create(form)
            fun.then(res => {
                toast(drawerTitle.value + "成功")
                opt.getData(editId ? null : 1)
            })
        })
    }

    // 重置表单
    const resetForm = (row) => {
        if (formRef.value) {
            formRef.value.clearValidate()
        }
        for (const key in defaultForm) {
            form[key] = row[key]
        }
    }

    // 新建
    const handelCreate = () => {
        editId.value = 0
        resetForm(defaultForm)
        drawerRef.value = true
    }

    // 更新
    const handelUpdate = (row) => {
        editId.value = row.id
        resetForm(row)
        drawerRef.value = true
    }



    return {
        form,
        formRef,
        defaultForm,
        drawerRef,
        rules,
        drawerTitle,
        resetForm,
        handelCreate,
        handelUpdate,
        handelSubmit
    }
}