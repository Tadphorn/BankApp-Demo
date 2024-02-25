
<script setup>
import { onMounted, ref } from 'vue';
import { useTransactionStore } from '../../stores/transaction';
import { useUserStore } from '../../stores/user';
import Profile from '../components/Profile.vue';
import ReceiveTable from '../components/ReceiveTable.vue';
import TransferTable from '../components/TransferTable.vue';

const userStore = useUserStore();
const transactionStore = useTransactionStore();
const isTransfer = ref(true);

onMounted(async () => {
    userStore.onAuthChange();
    transactionStore.getReceiveHistory();
    transactionStore.getTransferHistory();
});

</script>

<template>
    <div class="w-full">
        <div class="mt-20">
            <Profile :isUpdateBalance="transactionStore.isUpdateBalance" />
        </div>
        <div role="tablist" class="tabs tabs-boxed">
            <a role="tab" class="tab" :class="{ 'tab-active': isTransfer }" @click="isTransfer = true">Transfer</a>
            <a role="tab" class="tab" :class="{ 'tab-active': !isTransfer }" @click="isTransfer = false">Receive</a>
        </div>
        <div class="mt-5">
            <TransferTable v-if="isTransfer" :transfer="transactionStore.transfer" />
            <ReceiveTable v-else :receive="transactionStore.receive" />
        </div>

    </div>
</template>