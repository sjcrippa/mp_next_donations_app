import { MercadoPagoConfig, Preference } from 'mercadopago';
import { redirect } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET!)

type Donation = {
  id: number;
  created_at: number;
  amount: number;
  message: string;
}[];

export default async function Home() {
  const donations = await supabase
    .from('donations')
    .select('*')
    .then(({ data }) => data as unknown as Promise<Donation>) // revisar doc supabase para el unknown.

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
    <main className='grid gap-12'>
      <h1 className="text-2xl mt-5 mb-10 text-center">Donations app with Mercado Pago.</h1>

      <form action={donate} className="grid gap-6 border p-4 rounded-sm max-w-sm mx-auto">
        <Label className="grid gap-2">
          <span>Valor</span>
          <Input type="number" name="amount" />
        </Label>
        <Label className="grid gap-2">
          <span>Tu mensaje en la donacion</span>
          <Textarea name="message" className='resize-none' />
        </Label>
        <Button className='text-white' type="submit">Enviar</Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            donations.map((donation) => {
              return (
                <TableRow key={donation.id}>
                  <TableCell className='font-bold'>{donation.amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</TableCell>
                  <TableCell className='text-right'>{donation.message}</TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </main>
  )
}
