import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContentManagementPanel = () => {
  const [selectedTab, setSelectedTab] = useState('pages');

  const pages = [
    { id: 1, title: 'Homepage', status: 'Published', lastUpdated: '2 days ago', views: '15,234' },
    { id: 2, title: 'About Us', status: 'Published', lastUpdated: '1 week ago', views: '3,456' },
    { id: 3, title: 'Privacy Policy', status: 'Draft', lastUpdated: '3 days ago', views: '892' },
    { id: 4, title: 'Terms of Service', status: 'Published', lastUpdated: '1 month ago', views: '2,134' },
  ];

  const banners = [
    { id: 1, name: 'Summer Sale Banner', status: 'Active', location: 'Homepage Hero', clicks: '2,456' },
    { id: 2, name: 'New Arrivals', status: 'Scheduled', location: 'Category Pages', clicks: '1,234' },
    { id: 3, name: 'Black Friday Promo', status: 'Inactive', location: 'Checkout Page', clicks: '8,901' },
  ];

  const emailTemplates = [
    { id: 1, name: 'Welcome Email', type: 'Transactional', lastUsed: '2 hours ago', openRate: '85%' },
    { id: 2, name: 'Order Confirmation', type: 'Transactional', lastUsed: '5 mins ago', openRate: '92%' },
    { id: 3, name: 'Newsletter', type: 'Marketing', lastUsed: '1 week ago', openRate: '45%' },
    { id: 4, name: 'Password Reset', type: 'Transactional', lastUsed: '1 hour ago', openRate: '78%' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published': case'Active': return 'text-success bg-success/10';
      case 'Draft': case'Inactive': return 'text-muted-foreground bg-muted/10';
      case 'Scheduled': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Transactional': return 'text-primary bg-primary/10';
      case 'Marketing': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Content Management</h3>
              <p className="text-sm text-muted-foreground">Manage pages, banners, and email templates</p>
            </div>
          </div>
          <Button variant="default" size="sm" iconName="Plus">
            New Content
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'pages', label: 'Pages', icon: 'FileText' },
            { id: 'banners', label: 'Banners', icon: 'Image' },
            { id: 'emails', label: 'Email Templates', icon: 'Mail' },
          ]?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setSelectedTab(tab?.id)}
              className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                selectedTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {selectedTab === 'pages' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-md font-semibold text-foreground">Website Pages</h4>
              <Button variant="outline" size="sm" iconName="Plus">
                Add Page
              </Button>
            </div>
            {pages?.map((page) => (
              <div key={page?.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Icon name="FileText" size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{page?.title}</p>
                    <p className="text-sm text-muted-foreground">Updated {page?.lastUpdated}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{page?.views} views</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(page?.status)}`}>
                      {page?.status}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" iconName="Edit">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" iconName="Eye">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'banners' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-md font-semibold text-foreground">Promotional Banners</h4>
              <Button variant="outline" size="sm" iconName="Plus">
                Add Banner
              </Button>
            </div>
            {banners?.map((banner) => (
              <div key={banner?.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Icon name="Image" size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{banner?.name}</p>
                    <p className="text-sm text-muted-foreground">{banner?.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{banner?.clicks} clicks</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(banner?.status)}`}>
                      {banner?.status}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" iconName="Edit">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" iconName="BarChart3">
                      Analytics
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'emails' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-md font-semibold text-foreground">Email Templates</h4>
              <Button variant="outline" size="sm" iconName="Plus">
                New Template
              </Button>
            </div>
            {emailTemplates?.map((template) => (
              <div key={template?.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Icon name="Mail" size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{template?.name}</p>
                    <p className="text-sm text-muted-foreground">Last used {template?.lastUsed}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{template?.openRate} open rate</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(template?.type)}`}>
                      {template?.type}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" iconName="Edit">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" iconName="Send">
                      Send Test
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentManagementPanel;