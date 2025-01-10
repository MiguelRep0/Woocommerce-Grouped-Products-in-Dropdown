# Woocommerce-Grouped-Products-in-Dropdown
This project provides a dynamic product selection interface for a WooCommerce-based website. Users can select a product color and size, and specify the quantity before adding the product to the cart.

### HTML Structure

The HTML structure includes dropdowns for product color and size, a quantity input field, and a form for adding the product to the cart.

```html
<select id="productDropdownCor" style="display: none; margin-bottom: 10px; width: 200px;">
    <option value="" disabled selected>Select Color</option>
</select>
<select id="productDropdownTam" style="display: none; margin-bottom: 10px; width: 200px;">
    <option value="" disabled selected>Select Size</option>>
</select>

<!-- * Hide woocommerce-grouped-product-list group_table -->
<input type="number" id="quantityInput" style="display:none; margin-bottom: 10px; width: 100px;" placeholder="Enter quantity" min="1" max="999" step="1" value="1">
            
