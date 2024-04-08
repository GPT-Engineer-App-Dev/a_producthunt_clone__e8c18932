import React, { useState } from "react";
import { Box, Heading, Text, Image, VStack, HStack, Divider, Button, Input, IconButton, useToast } from "@chakra-ui/react";
import { FaArrowUp, FaPlus } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Product 1",
    description: "This is the first product",
    upvotes: 10,
    thumbnail: "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwdGh1bWJuYWlsfGVufDB8fHx8MTcxMjYwMDk3OHww&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: 2,
    name: "Product 2",
    description: "This is the second product",
    upvotes: 15,
    thumbnail: "https://images.unsplash.com/photo-1541877944-ac82a091518a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwyfHxwcm9kdWN0JTIwdGh1bWJuYWlsfGVufDB8fHx8MTcxMjYwMDk3OHww&ixlib=rb-4.0.3&q=80&w=1080",
  },
];

const Index = () => {
  const [productList, setProductList] = useState(products);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    thumbnail: "",
  });
  const toast = useToast();

  const handleUpvote = (id) => {
    setProductList(productList.map((product) => (product.id === id ? { ...product, upvotes: product.upvotes + 1 } : product)));
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.description && newProduct.thumbnail) {
      setProductList([
        ...productList,
        {
          id: productList.length + 1,
          ...newProduct,
          upvotes: 0,
        },
      ]);
      setNewProduct({ name: "", description: "", thumbnail: "" });
      toast({
        title: "Product added.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Please fill in all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxWidth="800px" margin="auto" padding={4}>
      <Heading as="h1" size="xl" textAlign="center" marginBottom={8}>
        ProductHunt Clone
      </Heading>
      <VStack spacing={8} align="stretch">
        {productList.map((product) => (
          <Box key={product.id} borderWidth={1} borderRadius="lg" padding={4}>
            <HStack spacing={4}>
              <IconButton icon={<FaArrowUp />} onClick={() => handleUpvote(product.id)} aria-label="Upvote" />
              <Text fontWeight="bold">{product.upvotes}</Text>
              <Image src={product.thumbnail} alt={product.name} boxSize="100px" objectFit="cover" />
              <Box>
                <Heading as="h2" size="md">
                  {product.name}
                </Heading>
                <Text>{product.description}</Text>
              </Box>
            </HStack>
          </Box>
        ))}
      </VStack>
      <Divider my={8} />
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="lg">
          Add a new product
        </Heading>
        <Input placeholder="Product name" name="name" value={newProduct.name} onChange={handleInputChange} />
        <Input placeholder="Product description" name="description" value={newProduct.description} onChange={handleInputChange} />
        <Input placeholder="Thumbnail URL" name="thumbnail" value={newProduct.thumbnail} onChange={handleInputChange} />
        <Button leftIcon={<FaPlus />} onClick={handleAddProduct}>
          Add Product
        </Button>
      </VStack>
    </Box>
  );
};

export default Index;
