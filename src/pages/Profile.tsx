import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit2, Save, X, User, Mail, Shield, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser, logout } = useUser();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    allergies: user?.allergies?.join(', ') || '',
    preferences: user?.preferences?.join(', ') || ''
  });

  const handleSave = () => {
    updateUser({
      name: formData.name,
      email: formData.email,
      allergies: formData.allergies.split(',').map(item => item.trim()),
      preferences: formData.preferences.split(',').map(item => item.trim())
    });
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <div className="bg-card shadow-soft p-mobile-padding">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/shop')}
            className="p-2 hover:bg-accent rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold text-foreground">Profile</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 hover:bg-accent rounded-full"
          >
            {isEditing ? <X className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      <div className="p-mobile-padding space-y-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-6"
        >
          <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-primary-foreground" />
          </div>
          <div className="inline-flex items-center gap-2 bg-success-soft px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-sm font-medium text-success">{user.profileType}</span>
          </div>
        </motion.div>

        {/* Profile Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {/* Name */}
          <div className="bg-card rounded-xl p-4 shadow-soft">
            <div className="flex items-center gap-3 mb-2">
              <User className="w-5 h-5 text-primary" />
              <Label htmlFor="name" className="text-sm font-semibold text-foreground">Name</Label>
            </div>
            {isEditing ? (
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="border-0 bg-accent/50"
              />
            ) : (
              <p className="text-foreground font-medium">{user.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="bg-card rounded-xl p-4 shadow-soft">
            <div className="flex items-center gap-3 mb-2">
              <Mail className="w-5 h-5 text-primary" />
              <Label htmlFor="email" className="text-sm font-semibold text-foreground">Email</Label>
            </div>
            {isEditing ? (
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="border-0 bg-accent/50"
              />
            ) : (
              <p className="text-foreground font-medium">{user.email}</p>
            )}
          </div>

          {/* Allergies */}
          <div className="bg-card rounded-xl p-4 shadow-soft">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-destructive" />
              <Label htmlFor="allergies" className="text-sm font-semibold text-foreground">Allergies</Label>
            </div>
            {isEditing ? (
              <Input
                id="allergies"
                value={formData.allergies}
                onChange={(e) => setFormData({...formData, allergies: e.target.value})}
                placeholder="Nuts, Shellfish"
                className="border-0 bg-accent/50"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {user.allergies.map((allergy, index) => (
                  <Badge key={index} variant="destructive" className="text-xs">
                    {allergy}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Preferences */}
          <div className="bg-card rounded-xl p-4 shadow-soft">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-5 h-5 text-success" />
              <Label htmlFor="preferences" className="text-sm font-semibold text-foreground">Preferences</Label>
            </div>
            {isEditing ? (
              <Input
                id="preferences"
                value={formData.preferences}
                onChange={(e) => setFormData({...formData, preferences: e.target.value})}
                placeholder="High-protein, Low-sugar"
                className="border-0 bg-accent/50"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {user.preferences.map((preference, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {preference}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3 pt-4"
        >
          {isEditing ? (
            <Button
              onClick={handleSave}
              className="w-full tap-target bg-success hover:bg-success/90 text-success-foreground rounded-xl"
              size="lg"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </Button>
          ) : (
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="w-full tap-target rounded-xl"
              size="lg"
            >
              Logout
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;