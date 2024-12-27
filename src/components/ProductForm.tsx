import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProductForm = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("XOF");
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feePercentage, setFeePercentage] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [redirectUrl, setRedirectUrl] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: settings, error } = await supabase
          .from('settings')
          .select('product_fee_percentage')
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (error) {
          console.error('Error fetching settings:', error);
          return;
        }
        
        if (settings) {
          setFeePercentage(settings.product_fee_percentage);
        } else {
          // Create default settings if none exist
          const { error: insertError } = await supabase
            .from('settings')
            .insert({
              user_id: user.id,
              product_fee_percentage: 0
            });
          
          if (insertError) {
            console.error('Error creating default settings:', insertError);
          }
        }
      }
    };
    
    fetchSettings();
  }, []);

  useEffect(() => {
    if (amount && !isNaN(parseFloat(amount))) {
      const baseAmount = parseFloat(amount);
      const fee = (baseAmount * feePercentage) / 100;
      setFinalAmount(baseAmount + fee);
    } else {
      setFinalAmount(0);
    }
  }, [amount, feePercentage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const createProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (parseInt(amount) < 200) {
      toast({
        title: "Montant invalide",
        description: "Le montant minimum est de 200 FCFA",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error("Utilisateur non authentifié");
      }

      let imageUrl = null;
      if (image) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(fileName, image);

        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName);
          
        imageUrl = publicUrl;
      }

      // Create payment link with new parameters
      const { data: paymentLinkData, error: paymentLinkError } = await supabase.functions.invoke(
        "create-payment-link",
        {
          body: {
            amount: parseInt(amount),
            description: description || name,
            payment_type: "product",
            currency,
            redirect_url: redirectUrl || null
          }
        }
      );

      if (paymentLinkError) throw paymentLinkError;

      // Create product with user_id
      const { data: productData, error: productError } = await supabase
        .from('products')
        .insert({
          name,
          description,
          amount: parseInt(amount),
          image_url: imageUrl,
          user_id: user.id,
          payment_link_id: paymentLinkData.payment_link_id
        })
        .select()
        .single();

      if (productError) throw productError;
      
      toast({
        title: "Produit créé",
        description: "Le produit a été créé avec succès",
      });
      
      // Refresh lists
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["payment-links"] });
      
      setName("");
      setDescription("");
      setAmount("");
      setImage(null);
      setRedirectUrl("");
    } catch (error) {
      console.error("Error creating product:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du produit",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={createProduct} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nom du produit</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom du produit"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description du produit"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Devise</label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une devise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="XOF">FCFA (XOF)</SelectItem>
                <SelectItem value="USD">Dollar (USD)</SelectItem>
                <SelectItem value="EUR">Euro (EUR)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Prix</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Minimum 200 FCFA"
              min="200"
              required
            />
          </div>
        </div>

        {amount && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-medium mb-2">Votre Client verra</label>
            <div className="text-lg font-semibold">
              {finalAmount.toFixed(2)} {currency}
              {feePercentage > 0 && (
                <span className="text-sm text-gray-500 ml-2">
                  (inclus {feePercentage}% de frais)
                </span>
              )}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">URL de redirection après paiement (optionnel)</label>
          <Input
            type="url"
            value={redirectUrl}
            onChange={(e) => setRedirectUrl(e.target.value)}
            placeholder="https://votre-site.com/merci"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="cursor-pointer"
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Création..." : "Créer le produit"}
        </Button>
      </form>
    </Card>
  );
};

export default ProductForm;