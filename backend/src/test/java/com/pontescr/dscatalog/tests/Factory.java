package com.pontescr.dscatalog.tests;

import java.time.Instant;

import com.pontescr.dscatalog.dto.ProductDTO;
import com.pontescr.dscatalog.entities.Category;
import com.pontescr.dscatalog.entities.Product;

public class Factory {

	public static Product createObject() {
		Product product = new Product(1L, "Phone", "Iphone 12", 12000.0,"http://teste.img", Instant.parse("2007-12-03T10:15:30.00Z"));
		product.getCategories().add(createCategory());
		return product;
	}
	
	public static ProductDTO createObjectDTO() {
		Product product = createObject();
		return new ProductDTO(product, product.getCategories());
	}
	
	public static Category createCategory() {
		return new Category(2L, "Electronics");
	}
}
