<script setup>

defineProps({
    transfer: Array,
})

</script>

<template>
    <div class="overflow-hidden h-56 overflow-y-scroll">
        <table class="table table-zebra table-pin-rows table-pin-cols ">
            <thead class="bg-lightGreen text-base">
                <tr>
                    <th>To</th>
                    <th>Amount</th>
                    <th>Remain</th>
                    <th>Datetime</th>
                </tr>
            </thead>
            <tbody v-for="(item, index) in transfer" :key="index">
                <tr>
                    <td>{{ item.toUser }}</td>
                    <td>- {{ item.amount }}</td>
                    <td>{{ item.remain }}</td>
                    <td>{{ item.timeStamp }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


