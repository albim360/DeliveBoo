<template>
    <div>
        <div>
            <h6>Total:</h6>
            <h6>Promo Code:</h6>
            <h6>Shipping:</h6>
            <div></div>
            <h6>Rs</h6>
        </div>
        <div>
            <h6>Rs {{ totalPrice }}</h6>
            <h6>Italy</h6>
            <h6>Rs 50</h6>
            <div></div>
            <h6>Rs {{ totalPrice + 50 }}</h6>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "Summary",
    props: ["totalPrice"]
};
</script>