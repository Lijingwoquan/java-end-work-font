import { router } from "~/router"
import {
    showFullLoading,
    hideFullLoading
} from "~/composables/util"


router.beforeEach(async (to, from, next) => {
    //显示loading
    showFullLoading()
    next();
});

router.afterEach((to, from) => {
    //隐藏loading
    hideFullLoading()
});