// AdminPanel.jsx (Cloudinary-based image upload with backend)
import {
  Box,
  Button,
  Heading,
  Input,
  Select,
  VStack,
  useToast,
  Spinner,
  Text,
  Progress,
} from "@chakra-ui/react";
import { useState } from "react";

export default function AdminPanel() {
  const toast = useToast();
  const [event, setEvent] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const API = import.meta.env.VITE_API_BASE;

  async function uploadToCloudinary(file, event) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("event", event);

 const res = await fetch(`${API}/upload?event=${encodeURIComponent(event)}`, {
  method: "POST",
  body: formData,
});


const text = await res.text();
console.log("[RAW RESPONSE]", text);

try {
  const data = JSON.parse(text);
  if (!res.ok) throw new Error(data?.message || "Upload failed");
  return data;
} catch (err) {
  console.error("Error parsing response:", err);
  throw new Error("Upload failed: " + text.slice(0, 100));
}

    
  }

  const handleUpload = async () => {
    if (!event || !file) {
      toast({ title: "Please select an event and a file", status: "warning" });
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      const result = await uploadToCloudinary(file, event);
      toast({
        title: "Upload successful",
        description: result.secure_url,
        status: "success",
      });
      console.log("✅ Uploaded to:", result.secure_url);
      setFile(null);
      setEvent("");
    } catch (err) {
      toast({
        title: "Upload failed",
        description: err?.message || "Something went wrong",
        status: "error",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box
      maxW="lg"
      mx="auto"
      p={8}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      mt={8}
    >
      <VStack spacing={6}>
        <Heading>Admin Panel</Heading>

        <Select
          placeholder="Select Event"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
        >
          <option value="Haldi">Haldi</option>
          <option value="Mehendi">Mehendi</option>
          <option value="Sangeet">Sangeet</option>
          <option value="Wedding">Wedding</option>
          <option value="Reception">Reception</option>
        </Select>

        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {file && <Text>Selected: {file.name}</Text>}

        {uploading && (
          <Progress value={progress} w="full" size="sm" colorScheme="green" />
        )}

        <Button
          onClick={handleUpload}
          isDisabled={!event || !file || uploading}
          colorScheme="blue"
          w="full"
        >
          {uploading ? <Spinner size="sm" mr={2} /> : null}
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      </VStack>
    </Box>
  );
}
