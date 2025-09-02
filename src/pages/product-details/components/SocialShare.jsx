import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialShare = ({ product, url }) => {
  const [copied, setCopied] = useState(false);

  const shareData = {
    title: product?.title,
    text: `Check out this amazing product: ${product?.title}`,
    url: url || window.location?.href
  };

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'text-blue-600',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData?.url)}`
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      color: 'text-blue-400',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData?.text)}&url=${encodeURIComponent(shareData?.url)}`
    },
    {
      name: 'WhatsApp',
      icon: 'MessageCircle',
      color: 'text-green-600',
      url: `https://wa.me/?text=${encodeURIComponent(`${shareData?.text} ${shareData?.url}`)}`
    },
    {
      name: 'Pinterest',
      icon: 'Image',
      color: 'text-red-600',
      url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareData?.url)}&description=${encodeURIComponent(shareData?.text)}`
    }
  ];

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard?.writeText(shareData?.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log('Error copying to clipboard:', error);
    }
  };

  const handleSocialShare = (platform) => {
    window.open(platform?.url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-foreground">Share this product</h3>
      <div className="flex flex-wrap gap-2">
        {/* Native Share (if supported) */}
        {navigator.share && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleNativeShare}
            iconName="Share"
            iconPosition="left"
          >
            Share
          </Button>
        )}

        {/* Social Platform Buttons */}
        {socialPlatforms?.map((platform) => (
          <Button
            key={platform?.name}
            variant="outline"
            size="sm"
            onClick={() => handleSocialShare(platform)}
            className="flex items-center space-x-2"
          >
            <Icon name={platform?.icon} size={16} className={platform?.color} />
            <span className="hidden sm:inline">{platform?.name}</span>
          </Button>
        ))}

        {/* Copy Link Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          iconName={copied ? "Check" : "Copy"}
          iconPosition="left"
          className={copied ? "text-success border-success" : ""}
        >
          {copied ? 'Copied!' : 'Copy Link'}
        </Button>
      </div>
      {/* Email Share */}
      <div className="pt-2 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const subject = encodeURIComponent(`Check out: ${product?.title}`);
            const body = encodeURIComponent(`I found this product and thought you might be interested:\n\n${product?.title}\n${shareData?.url}`);
            window.location.href = `mailto:?subject=${subject}&body=${body}`;
          }}
          iconName="Mail"
          iconPosition="left"
          className="text-muted-foreground hover:text-foreground"
        >
          Share via Email
        </Button>
      </div>
    </div>
  );
};

export default SocialShare;