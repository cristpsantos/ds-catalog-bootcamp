package com.pontescr.dscatalog.services;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.pontescr.dscatalog.dto.ProductDTO;
import com.pontescr.dscatalog.entities.Category;
import com.pontescr.dscatalog.entities.Product;
import com.pontescr.dscatalog.repositories.CategoryRepository;
import com.pontescr.dscatalog.repositories.ProductRepository;
import com.pontescr.dscatalog.services.exceptions.DatabaseException;
import com.pontescr.dscatalog.services.exceptions.ResourceNotFoundException;
import com.pontescr.dscatalog.tests.Factory;

@ExtendWith(SpringExtension.class)
public class ProductServiceTests {

	@InjectMocks
	private ProductService service;
	
	@Mock
	private ProductRepository repository;
	
	@Mock
	private CategoryRepository categoryRepository;
	
	private long existsId;
	private long nonExistsId;
	private long dependentId;
	private PageImpl<Product> page;
	private Product product;
	private ProductDTO productDto;
	private Category category;
	
	@BeforeEach
	void setUp() {
		existsId = 1L;
		nonExistsId = 1000L;
		dependentId = 4L;
		product = Factory.createProduct();
		productDto = Factory.createProductDTO();
		category = Factory.createCategory();
		page = new PageImpl<>(List.of(product));
		
		Mockito.when(repository.findAll((Pageable)ArgumentMatchers.any())).thenReturn(page);
		Mockito.when(repository.save(ArgumentMatchers.any())).thenReturn(product);
		
		Mockito.when(repository.find(ArgumentMatchers.any(),ArgumentMatchers.any(),ArgumentMatchers.any())).thenReturn(page);
		
		Mockito.when(repository.getOne(existsId)).thenReturn(product);
		Mockito.when(repository.getOne(nonExistsId)).thenThrow(EntityNotFoundException.class);
		
		Mockito.when(categoryRepository.getOne(existsId)).thenReturn(category);
		Mockito.when(categoryRepository.getOne(nonExistsId)).thenThrow(EntityNotFoundException.class);
		
		Mockito.when(repository.findById(existsId)).thenReturn(Optional.of(product));
		Mockito.when(repository.findById(nonExistsId)).thenReturn(Optional.empty());
		
		Mockito.doNothing().when(repository).deleteById(existsId);
		Mockito.doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(nonExistsId);
		Mockito.doThrow(DataIntegrityViolationException.class).when(repository).deleteById(dependentId);
	}
	@Test
	public void updateShouldThrowResourceNotFoundExceptionWhenIdDoesNotExists() {
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.update(nonExistsId, productDto);
		});
		
		Mockito.verify(repository).getOne(nonExistsId);
	}
	
	@Test
	public void updateShouldReturnProductDTOWhenIdExists() {
		ProductDTO dto = service.update(existsId, productDto);
		
		Assertions.assertNotNull(dto);
		
		Mockito.verify(repository).getOne(existsId);
	}
	
	@Test
	public void findByIdShouldThrowResourceNotFoundExceptionWhenIdDoesNotExists() {
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.findById(nonExistsId);
		});
		
		Mockito.verify(repository).findById(nonExistsId);	
	}
	
	@Test
	public void findByIdShouldReturnProductWhenIdExists() {
		ProductDTO dto = service.findById(existsId);
		
		Assertions.assertNotNull(dto);
		
		Mockito.verify(repository).findById(existsId);
	}
	
	@Test
	public void findAllPagedReturnPage() {
		Pageable pageable = PageRequest.of(0, 10);
		
		Page<ProductDTO> result = service.findAllPaged(0L, "", pageable);
		
		Assertions.assertNotNull(result);
	}
	
	@Test
	public void deleteShouldThrowDataIntegrityViolationExceptionWhenDependentId() {
		
		Assertions.assertThrows(DatabaseException.class, () -> {
			service.delete(dependentId);
		});
		
		Mockito.verify(repository, Mockito.times(1)).deleteById(dependentId);
	}
	
	@Test
	public void deleteShouldThrowResourceNotFoundExceptionWhenIdNotExists() {
		
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.delete(nonExistsId);
		});
		
		Mockito.verify(repository, Mockito.times(1)).deleteById(nonExistsId);
	}
	
	@Test
	public void deleteShouldDoNothingWhenIdExists() {
		
		Assertions.assertDoesNotThrow(() -> {
			service.delete(existsId);
		});
	
		Mockito.verify(repository, Mockito.times(1)).deleteById(existsId);
	}
	
}