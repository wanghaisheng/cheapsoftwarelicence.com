<script lang="ts" setup></script>

<template>
  <div class="w-4/6 mx-auto h-screen mt-10">
    <span class="font-inter text-xl font-bold">FAQ</span>
    <div class="faq-container">
      <div class="faq-item">
        <div class="question">
          1. What kind of products are available on your website?
        </div>
        <div class="answer">
          We offer a diverse range of products, including electronics, fashion
          accessories, home decor, beauty products, and more. Our catalog is
          carefully curated to cater to a wide variety of interests and needs.
        </div>
      </div>
      <div class="faq-item">
        <div class="question">2. How can I place an order on your website?</div>
        <div class="answer">
          Placing an order is easy! Simply browse our product categories, select
          the items you want, and add them to your cart. Once you're done
          shopping, proceed to the checkout page, where you'll provide your
          shipping information and payment details to finalize the order.
        </div>
      </div>
      <div class="faq-item">
        <div class="question">3. What payment methods do you accept?</div>
        <div class="answer">
          We accept major credit and debit cards, as well as popular digital
          payment methods such as PayPal, Apple Pay, and Google Pay. This
          ensures a seamless and secure payment experience for our customers.
        </div>
      </div>
      <div class="faq-item">
        <div class="question">
          4. How will my order be shipped, and what are the associated costs?
        </div>
        <div class="answer">
          We offer various shipping options, including standard, expedited, and
          sometimes even free shipping promotions. Shipping costs depend on
          factors like the destination, chosen shipping method, and the weight
          of the products. You'll see the available options and costs during the
          checkout process before making a payment.
        </div>
      </div>
      <div class="faq-item">
        <div class="question">5. What is your return and refund policy?</div>
        <div class="answer">
          We have a hassle-free return policy. If you're not satisfied with your
          purchase, you can return it within 30 days of receiving the item. Just
          ensure the product is in its original condition with all packaging
          intact. Once we receive the returned item, we'll process your refund.
          For detailed information, please refer to our Returns and Refunds
          page.
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
}
.faq-container {
  max-width: 600px;
  margin: 0 auto;
}
.faq-item {
  margin-bottom: 20px;
}
.question {
  font-weight: bold;
}
.answer {
  margin-top: 5px;
}
</style>
