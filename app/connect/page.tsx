"use client";

import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { LOCAL_STORAGE_KEYS } from "@/consts/local-storage";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const address = formData.get("endpoint") as string;
    const token = formData.get("token") as string;

    try {
      setErrorMessage("");
      setIsLoading(true);
      const res = await axios.post("/api/milvus/connect", {
        address,
        token,
      });
      console.log(res);
      sessionStorage.setItem(
        LOCAL_STORAGE_KEYS.CURRENT_CONNECTION,
        JSON.stringify({
          address,
          token,
        })
      );
      axios.defaults.headers.common["Address"] = address;
      axios.defaults.headers.common["Token"] = token;
      router.push("/");
    } catch (error) {
      console.error(error);
      setErrorMessage(
        (error as AxiosError<{ error: string }>).response?.data?.error ??
          (error as Error).message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4 justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your VectorDB</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="endpoint">Endpoint</Label>
                <Input
                  id="endpoint"
                  name="endpoint"
                  type="text"
                  placeholder="http://localhost:19530"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="token">Token(Optional)</Label>
                </div>
                <Input
                  id="token"
                  name="token"
                  type="password"
                  placeholder="token"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      {errorMessage && (
        <Alert className="w-full max-w-sm" variant="destructive">
          <AlertDescription className="text-gray-500">
            {errorMessage}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
