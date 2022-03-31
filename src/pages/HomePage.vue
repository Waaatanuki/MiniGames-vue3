<template>
    <div class="main">
        <div class="content">
            <div>KEEP</div>
            <div>CODING</div>
            <div style=" font-size:2rem;">AND</div>
            <div>CARRY</div>
            <div>ON</div>
        </div>
        <div class="footer">Presented by Waaatanuki</div>
    </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: calc(100vh - 3rem);
    padding-top: 3rem;
}
.content {
    margin-top: 3rem;
    font-weight: bold;
    width: 320px;
    font-size: 5rem;
    text-align: center;
    div {
        margin-top: 1rem;
    }
}
.footer {
    margin-bottom: 10px;
}
a {
    color: #1a2a3a;
    text-decoration: none;
}
</style>