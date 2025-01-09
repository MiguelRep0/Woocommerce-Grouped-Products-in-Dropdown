document.addEventListener('DOMContentLoaded', function() {
    var labels = document.querySelectorAll('label[for^="product-"]');
    var dropdownCor = document.getElementById('productDropdownCor');
    var dropdownTam = document.getElementById('productDropdownTam');
    var quantityInput = document.getElementById('quantityInput');
    var addButton = document.querySelector('.single_add_to_cart_button');
    var numberPattern = /\d+.*$/;
    var uniqueLabels = new Set();
    var uniqueNumbers = new Map();

    labels.forEach(function(label) {
        var labelText = label.textContent.replace(numberPattern, '').trim();
        var labelNumber = label.textContent.match(numberPattern) ? label.textContent.match(numberPattern)[0].trim() : '';

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
            uniqueNumbers.get(labelText).push(labelNumber);
        }
    });

    dropdownCor.style.display = dropdownCor.options.length > 1 ? 'block' : 'none';
    dropdownTam.style.display = 'none';

    if (dropdownCor.options.length <= 1) {
        dropdownTam.innerHTML = '';

        var placeholderOption = document.createElement('option');
        placeholderOption.value = '';
        placeholderOption.disabled = true;
        placeholderOption.selected = true;
        placeholderOption.textContent = 'Select Size';
        dropdownTam.appendChild(placeholderOption);

        uniqueNumbers.forEach(function(numbers) {
            numbers.forEach(function(number) {
                var optionTam = document.createElement('option');
                optionTam.value = number;
                optionTam.textContent = number;
                dropdownTam.appendChild(optionTam);
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
            uniqueNumbers.get(selectedText).forEach(function(number) {
                var optionTam = document.createElement('option');
                optionTam.value = number;
                optionTam.textContent = number;
                dropdownTam.appendChild(optionTam);
            });
        }

        dropdownTam.style.display = dropdownTam.options.length > 1 ? 'block' : 'none';
        quantityInput.style.display = 'none';
    });

    dropdownTam.addEventListener('change', function() {
        quantityInput.style.display = 'block';
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