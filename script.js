<script>
    document.addEventListener('DOMContentLoaded', function() {
        var labels = document.querySelectorAll('label[for^="product-"]');
        var dropdownCor = document.getElementById('productDropdownCor');
        var dropdownTam = document.getElementById('productDropdownTam');
        var quantityInput = document.getElementById('quantityInput');
        var addButton = document.querySelector('.single_add_to_cart_button');
        var priceElement = document.querySelector('p.price');
        var numberPattern = /\d+.*$/;
        var uniqueLabels = new Set();
        var uniqueNumbers = new Map();

        labels.forEach(function(label) {
            var labelText = label.textContent.replace(numberPattern, '').trim();
            var labelNumber = label.textContent.match(numberPattern) ? label.textContent.match(numberPattern)[0].trim() : '';
            var price = parseFloat(label.closest('tr').querySelector('.woocommerce-Price-amount').textContent.replace(',', '.').replace(/[^\d.]/g, ''));

            if (labelText && !uniqueLabels.has(labelText)) {
                uniqueLabels.add(labelText);
                var optionCor = document.createElement('option');
                optionCor.value = labelText;
                optionCor.textContent = labelText;
                dropdownCor.appendChild(optionCor);
            }

            if (labelNumber) {
                if (!uniqueNumbers.has(labelText)) {
                    uniqueNumbers.set(labelText, []);
                }
                uniqueNumbers.get(labelText).push({ number: labelNumber, price: price });
            }
        });

        dropdownCor.style.display = dropdownCor.options.length > 1 ? 'block' : 'none';
        dropdownTam.style.display = 'none';
        quantityInput.style.display = 'none';

        if (dropdownCor.options.length <= 1) {
            dropdownTam.innerHTML = '';

            var placeholderOption = document.createElement('option');
            placeholderOption.value = '';
            placeholderOption.disabled = true;
            placeholderOption.selected = true;
            placeholderOption.textContent = 'Select Size';
            dropdownTam.appendChild(placeholderOption);

            var uniqueSizes = new Set();
            uniqueNumbers.forEach(function(numbers) {
                numbers.forEach(function(item) {
                    if (!uniqueSizes.has(item.number)) {
                        uniqueSizes.add(item.number);
                        var optionTam = document.createElement('option');
                        optionTam.value = item.number;
                        optionTam.textContent = item.number;
                        dropdownTam.appendChild(optionTam);
                    }
                });
            });

            dropdownTam.style.display = dropdownTam.options.length > 1 ? 'block' : 'none';
        }

        dropdownCor.addEventListener('change', function() {
            var selectedText = dropdownCor.value;
            dropdownTam.innerHTML = '';

            var placeholderOption = document.createElement('option');
            placeholderOption.value = '';
            placeholderOption.disabled = true;
            placeholderOption.selected = true;
            placeholderOption.textContent = 'Select Size';
            dropdownTam.appendChild(placeholderOption);

            if (uniqueNumbers.has(selectedText)) {
                var uniqueSizes = new Set();
                uniqueNumbers.get(selectedText).forEach(function(item) {
                    if (!uniqueSizes.has(item.number)) {
                        uniqueSizes.add(item.number);
                        var optionTam = document.createElement('option');
                        optionTam.value = item.number;
                        optionTam.textContent = item.number;
                        dropdownTam.appendChild(optionTam);
                    }
                });
            }

            dropdownTam.style.display = dropdownTam.options.length > 1 ? 'block' : 'none';
            quantityInput.style.display = dropdownTam.options.length <= 1 ? 'block' : 'none';
        });

        dropdownTam.addEventListener('change', function() {
            quantityInput.style.display = 'block';
            var selectedText = dropdownCor.value;
            var selectedSize = dropdownTam.value;

            if (uniqueNumbers.has(selectedText)) {
                var selectedItem = uniqueNumbers.get(selectedText).find(function(item) {
                    return item.number === selectedSize;
                });

                if (selectedItem) {
                    priceElement.innerHTML = `<span class="woocommerce-Price-amount amount"><bdi>${selectedItem.price.toFixed(2)}&nbsp;<span class="woocommerce-Price-currencySymbol">€</span></bdi></span> <small class="woocommerce-price-suffix">(s/ IVA)</small>`;
                }
            }
        });

        quantityInput.addEventListener('input', function() {
            var selectedText = dropdownCor.value;
            var selectedSize = dropdownTam.value;
            var quantity = quantityInput.value;

            if (uniqueNumbers.has(selectedText)) {
                var selectedItem = uniqueNumbers.get(selectedText).find(function(item) {
                    return item.number === selectedSize;
                });

                if (selectedItem) {
                    var totalPrice = (selectedItem.price * quantity).toFixed(2);
                    priceElement.innerHTML = `<span class="woocommerce-Price-amount amount"><bdi>${totalPrice}&nbsp;<span class="woocommerce-Price-currencySymbol">€</span></bdi></span> <small class="woocommerce-price-suffix">(s/ IVA)</small>`;
                }
            }
        });

        addButton.addEventListener('click', function(event) {
            var selectedCor = dropdownCor.value;
            var selectedTam = dropdownTam.value;
            var quantity = quantityInput.value;

            var matchedProduct = Array.from(document.querySelectorAll('.woocommerce-grouped-product-list-item')).find(function(item) {
                var label = item.querySelector('label').textContent;
                return label.includes(selectedCor) && label.includes(selectedTam);
            });

            if (matchedProduct) {
                var input = matchedProduct.querySelector('input[type="number"]');
                input.value = quantity;
            } else {
                event.preventDefault();
                alert('No matching product found.');
            }
        });

        var forms = document.querySelectorAll('.cart.grouped_form');
        forms.forEach(function(form) {
            form.action = window.location.href;
        });
    });
</script>
