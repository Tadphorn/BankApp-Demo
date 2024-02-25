<script setup>
import { useUserStore } from '../../stores/user';
import { useTransactionStore } from '../../stores/transaction';

const userStore = useUserStore();
const transactionStore = useTransactionStore();

defineProps({
    isUpdateBalance: Boolean,
})

</script>


<template>
    <div>
        <div class="mb-10">
            <div class="flex flex-row mb-8">
                <img src="../assets/icon-person.png">
                <div class="grid content-center pl-5">
                    <p class="text-xl font-medium mb-1">{{ userStore.userInfo.userName }}</p>
                    <p class="text-xl ">{{ userStore.userInfo.accountId }}</p>
                </div>
            </div>

            <div class="card w-96 h-40 bg-base-100 shadow-xl">
                <div class="card-body">
                    <p class="card-title text-lg justify-center font-medium">Balance</p>
                    <hr class="border border-lightGreen">
                    <p v-if="transactionStore.isUpdateBalance" class="text-2xl text-center p-5 font-semibold">
                        {{ transactionStore.balance }}</p>
                    <p v-else class="text-2xl text-center p-5 font-semibold">{{ userStore.userInfo.balance }}</p>

                </div>
            </div>
        </div>
    </div>
</template>

