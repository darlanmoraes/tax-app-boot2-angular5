package com.darlan.taxclient;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class ClientInterceptorTests {

	@Test
	public void testValidateC() {
		final ClientInterceptor interceptor = new ClientInterceptor();
		final Client client = new Client();
		client.setName("Name 1");
		client.setSalary(1000F);
		client.setAddress("Address 1");
		interceptor.validate(client, null);
		Assert.assertEquals(Client.Risk.C, client.getRisk());
	}

	@Test
	public void testValidateB() {
		final ClientInterceptor interceptor = new ClientInterceptor();
		final Client client = new Client();
		client.setName("Name 1");
		client.setSalary(3000F);
		client.setAddress("Address 1");
		interceptor.validate(client, null);
		Assert.assertEquals(Client.Risk.B, client.getRisk());
	}

	@Test
	public void testValidateA() {
		final ClientInterceptor interceptor = new ClientInterceptor();
		final Client client = new Client();
		client.setName("Name 1");
		client.setSalary(9000F);
		client.setAddress("Address 1");
		interceptor.validate(client, null);
		Assert.assertEquals(Client.Risk.A, client.getRisk());
	}

}
