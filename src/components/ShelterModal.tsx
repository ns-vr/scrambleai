import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ShelterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shelter: {
    name: string;
    capacity: number;
    occupied: number;
    status: "Open" | "Full" | "Closed";
  };
  onSave: (data: { occupied: number; status: "Open" | "Full" | "Closed" }) => void;
}

export default function ShelterModal({ open, onOpenChange, shelter, onSave }: ShelterModalProps) {
  const [occupied, setOccupied] = useState(shelter.occupied);
  const [status, setStatus] = useState(shelter.status);

  const handleSave = () => {
    onSave({ occupied, status });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">{shelter.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div>
            <Label className="text-muted-foreground text-xs uppercase tracking-wider font-mono">
              Occupied Count
            </Label>
            <Input
              type="number"
              value={occupied}
              onChange={e => setOccupied(Number(e.target.value))}
              max={shelter.capacity}
              min={0}
              className="mt-1 bg-input border-border font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              Capacity: {shelter.capacity}
            </p>
          </div>
          <div>
            <Label className="text-muted-foreground text-xs uppercase tracking-wider font-mono">
              Status
            </Label>
            <Select value={status} onValueChange={(v: "Open" | "Full" | "Closed") => setStatus(v)}>
              <SelectTrigger className="mt-1 bg-input border-border font-mono">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="Full">Full</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSave} className="w-full">
            Update Shelter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
