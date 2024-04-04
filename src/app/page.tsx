import { MercadoPagoConfig, Preference } from 'mercadopago';
import { redirect } from 'next/navigation';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

export default function Home() {

  async function donate(formData: FormData) {
    'use server'

    const preference = await new Preference(client)
      .create({
        body: {
          items: [
            {
              id: 'donation',
              title: formData.get('message') as string,
              quantity: 1,
              unit_price: Number(formData.get('amount'))
            }
          ],
        }
      })

    redirect(preference.sandbox_init_point!)
  }

  return (
    <>
      <h1 className="text-2xl mt-5 mb-10">Mercado Pago donations app</h1>
      <form action={donate} className="grid gap-6 border p-4 rounded-sm">
        <Label className="grid gap-2">
          <span>Valor</span>
          <Input type="number" name="amount" />
        </Label>
        <Label className="grid gap-2">
          <span>Tu mensaje en la donacion</span>
          <Textarea name="message" />
        </Label>
        <Button type="submit">Enviar</Button>
      </form>
    </>
  )
}
