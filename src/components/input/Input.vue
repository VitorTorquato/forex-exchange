<script>
    export default{
        name:'Input'
    }
</script>

<template>
        <div class="input_container">
            <select type="select" name="currency" id="currency">
                <option value="USD">USD</option>
                <option value="BRL">BRL</option>
                <option value="EUR">EUR</option>
                <option value="BIT">BIT</option>
            </select>
        </div>
</template>

<style scoped>

    .input_container{
        width: 100%;
        border: 2px solid #222;
        border-radius: 1rem;
        padding-right: 1rem;
    }


</style>