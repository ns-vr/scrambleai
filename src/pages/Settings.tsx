import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Shield, Upload, Save, Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function SettingsPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "Commander Priya Sharma",
    email: "priya.sharma@scramble.gov",
    phone: "+91 98765 43210",
    role: "admin",
    department: "Disaster Response Command",
    bio: "Lead disaster response coordinator for metropolitan Bangalore region. 12 years of experience in emergency management and smart city operations.",
    language: "en",
  });

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Max 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result as string);
    reader.readAsDataURL(file);
    toast.success("Avatar uploaded");
  };

  const handleSave = () => {
    toast.success("Profile updated successfully");
  };

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-6 min-h-screen">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-wide">Settings</h1>
        <p className="text-sm text-muted-foreground font-mono">Manage your profile and preferences</p>
      </div>

      {/* Avatar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="data-panel border border-border flex items-center gap-6"
      >
        <div className="relative group">
          <div className="w-20 h-20 rounded-full bg-muted border-2 border-primary/30 overflow-hidden flex items-center justify-center">
            {avatar ? (
              <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
          <button
            onClick={() => fileRef.current?.click()}
            className="absolute inset-0 rounded-full bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          >
            <Camera className="h-5 w-5 text-primary" />
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden"
          />
        </div>
        <div>
          <h2 className="font-heading text-lg font-semibold">{form.name}</h2>
          <p className="text-sm text-muted-foreground font-mono">{form.department}</p>
          <button
            onClick={() => fileRef.current?.click()}
            className="text-xs text-primary mt-1 flex items-center gap-1 hover:underline"
          >
            <Upload className="h-3 w-3" /> Upload photo
          </button>
        </div>
      </motion.div>

      {/* Profile Form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="data-panel border border-border space-y-5"
      >
        <h2 className="font-heading text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Profile Information
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs uppercase tracking-wider font-mono text-muted-foreground flex items-center gap-1.5">
              <User className="h-3 w-3" /> Full Name
            </Label>
            <Input
              value={form.name}
              onChange={e => handleChange("name", e.target.value)}
              className="mt-1 bg-input border-border font-body"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider font-mono text-muted-foreground flex items-center gap-1.5">
              <Mail className="h-3 w-3" /> Email
            </Label>
            <Input
              type="email"
              value={form.email}
              onChange={e => handleChange("email", e.target.value)}
              className="mt-1 bg-input border-border font-body"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider font-mono text-muted-foreground flex items-center gap-1.5">
              <Phone className="h-3 w-3" /> Phone
            </Label>
            <Input
              value={form.phone}
              onChange={e => handleChange("phone", e.target.value)}
              className="mt-1 bg-input border-border font-mono"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider font-mono text-muted-foreground flex items-center gap-1.5">
              <Shield className="h-3 w-3" /> Role
            </Label>
            <Select value={form.role} onValueChange={v => handleChange("role", v)}>
              <SelectTrigger className="mt-1 bg-input border-border font-mono">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="commander">Field Commander</SelectItem>
                <SelectItem value="responder">First Responder</SelectItem>
                <SelectItem value="analyst">Analyst</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="text-xs uppercase tracking-wider font-mono text-muted-foreground">
            Department
          </Label>
          <Input
            value={form.department}
            onChange={e => handleChange("department", e.target.value)}
            className="mt-1 bg-input border-border font-body"
          />
        </div>

        <div>
          <Label className="text-xs uppercase tracking-wider font-mono text-muted-foreground">
            Bio
          </Label>
          <Textarea
            value={form.bio}
            onChange={e => handleChange("bio", e.target.value)}
            rows={3}
            className="mt-1 bg-input border-border font-body resize-none"
          />
        </div>

        <div>
          <Label className="text-xs uppercase tracking-wider font-mono text-muted-foreground">
            Preferred Language
          </Label>
          <Select value={form.language} onValueChange={v => handleChange("language", v)}>
            <SelectTrigger className="mt-1 bg-input border-border w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="kn">ಕನ್ನಡ (Kannada)</SelectItem>
              <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
              <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
              <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </motion.div>

      {/* Document Upload */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="data-panel border border-border space-y-4"
      >
        <h2 className="font-heading text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Documents & Uploads
        </h2>
        <div
          className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/40 transition-colors"
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.multiple = true;
            input.onchange = () => toast.success(`${input.files?.length || 0} file(s) selected`);
            input.click();
          }}
        >
          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">Click to upload documents, maps, or reports</p>
          <p className="text-xs text-muted-foreground font-mono mt-1">PDF, DOC, PNG, JPG — Max 20MB</p>
        </div>
      </motion.div>
    </div>
  );
}
