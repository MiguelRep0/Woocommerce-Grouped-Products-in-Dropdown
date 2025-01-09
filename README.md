# Woocommerce-Grouped-Products-in-Dropdown
This project provides a dynamic product selection interface for a WooCommerce-based website. Users can select a product color and size, and specify the quantity before adding the product to the cart.

### HTML Structure

The HTML structure includes dropdowns for product color and size, a quantity input field, and a form for adding the product to the cart.

```html
<select id="productDropdownCor">
    <option value="" disabled selected>Select Color</option>
</select>
<select id="productDropdownTam">
    <option value="" disabled selected>Select Size</option>
</select>
<input type="number" id="quantityInput" style="display:none;" placeholder="Enter quantity" min="1" max="999" step="1" value="1">

<!-- * Hide woocommerce-grouped-product-list group_table -->
<table cellspacing="0" class="woocommerce-grouped-product-list group_table" style="display: none;">
