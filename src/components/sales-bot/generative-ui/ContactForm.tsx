import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Phone, Mail, User, MessageSquare } from "lucide-react";

interface ProjectSummary {
  service: string;
  budget: number;
  timeline: string;
  details: string;
}

interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  preferredContact: "email" | "phone" | "text";
  additionalNotes: string;
  agreeToTerms: boolean;
}

interface ContactFormProps {
  projectSummary: ProjectSummary;
  onSubmit: (contact: ContactInfo) => void;
}

export function ContactForm({ projectSummary, onSubmit }: ContactFormProps) {
  const [contact, setContact] = useState<ContactInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    preferredContact: "email",
    additionalNotes: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<Partial<ContactInfo>>({});

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const validate = () => {
    const newErrors: Partial<ContactInfo> = {};
    
    if (!contact.firstName) newErrors.firstName = "First name is required";
    if (!contact.lastName) newErrors.lastName = "Last name is required";
    if (!contact.email) newErrors.email = "Email is required";
    if (!contact.phone) newErrors.phone = "Phone is required";
    if (!contact.address) newErrors.address = "Address is required";
    if (!contact.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(contact);
    }
  };

  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>Almost Done! Let's Get Your Contact Details</CardTitle>
        <CardDescription>
          We'll use this information to send you the final proposal and connect you with contractors
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Project Summary */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold mb-2">Your Project Summary</h4>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Service:</span> {projectSummary.service}</p>
            <p><span className="font-medium">Budget:</span> {formatCurrency(projectSummary.budget)}</p>
            <p><span className="font-medium">Timeline:</span> {projectSummary.timeline}</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="flex items-center gap-2">
                <User className="w-4 h-4" /> First Name
              </Label>
              <Input
                id="firstName"
                value={contact.firstName}
                onChange={(e) => setContact({ ...contact, firstName: e.target.value })}
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={contact.lastName}
                onChange={(e) => setContact({ ...contact, lastName: e.target.value })}
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email
            </Label>
            <Input
              id="email"
              type="email"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              value={contact.phone}
              onChange={(e) => setContact({ ...contact, phone: e.target.value })}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
          </div>

          <div>
            <Label htmlFor="address">Project Address</Label>
            <Input
              id="address"
              value={contact.address}
              onChange={(e) => setContact({ ...contact, address: e.target.value })}
              placeholder="Where will the work be done?"
              className={errors.address ? "border-red-500" : ""}
            />
            {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
          </div>

          <div>
            <Label>Preferred Contact Method</Label>
            <div className="flex gap-4 mt-2">
              {["email", "phone", "text"].map((method) => (
                <label key={method} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="preferredContact"
                    value={method}
                    checked={contact.preferredContact === method}
                    onChange={(e) => setContact({ ...contact, preferredContact: e.target.value as any })}
                    className="text-blue-600"
                  />
                  <span className="capitalize">{method}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="notes" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Additional Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              value={contact.additionalNotes}
              onChange={(e) => setContact({ ...contact, additionalNotes: e.target.value })}
              placeholder="Any special requirements or questions?"
              rows={3}
            />
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={contact.agreeToTerms}
              onCheckedChange={(checked) => setContact({ ...contact, agreeToTerms: checked as boolean })}
            />
            <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
              I agree to receive quotes from pre-screened contractors and understand that my information will be shared with them for the purpose of this project.
            </label>
          </div>
          {errors.agreeToTerms && <p className="text-xs text-red-500">{errors.agreeToTerms}</p>}
        </div>

        <Button 
          onClick={handleSubmit}
          size="lg"
          className="w-full"
          disabled={!contact.agreeToTerms}
        >
          Submit & Get Matched with Contractors
        </Button>
      </CardContent>
    </Card>
  );
}