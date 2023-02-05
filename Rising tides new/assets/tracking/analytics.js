import { getDidomiCookieConsent, getGaId, getHash } from 'tracking/utils';

document.addEventListener('turbo:load', () => {
  window.pageIdForToolsSynch = getHash();
  sendToDataLayer();
  window.didomiOnReady = window.didomiOnReady || [];
  window.didomiOnReady.push(function (Didomi) {
    // Didomi ready : the Didomi JS library is loaded
    if (!Didomi.shouldConsentBeCollected()) {
      // Consent has already been collected : Segment load and page
      addSegmentPageEvent();
    } else {
      // Consent has not been collected yet
      Didomi.on('consent.changed', function () {
        // Consent has been collected (changed for the first): Segment load and page
        addSegmentPageEvent();
      });
    }
  });
  document.querySelectorAll('a', 'button').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.currentTarget.dataset.track === 'false') return;

      addSegmentTrackEvent(event);
      addSegmentIdentifyEvent();
    })
  })
  document.querySelectorAll('form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      addSegmentTrackEvent(event, 'website_form_blog_submitted');
      addSegmentIdentifyEvent();
    })
  })
})

const addSegmentPageEvent = () => {
  const segmentKey = document.querySelector('#segmentKey').dataset.segmentKey;
  !function(){
    var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey=segmentKey;analytics.SNIPPET_VERSION="4.15.2";
    analytics.load(
      segmentKey,
      {
        integrations: {
          // Syntax: '%Segment_Destination_Name%': Didomi.getUserConsentStatusForVendor('%Didomi_Vendor_SDK_Id%'),
          'Google Analytics': true, // because purpose: "Internal Analytics" (required)
          'Amplitude': Didomi.getUserConsentStatusForVendor('c:amplitude'),
          'Facebook Pixel': Didomi.getUserConsentStatusForVendor('c:fb-ads'),
          'Facebook Conversions API': Didomi.getUserConsentStatusForVendor('c:fb-ads'),
          'Google Ads (Classic)': Didomi.getUserConsentStatusForVendor('c:double-click'),
          'Google Tag Manager': true, // because purpose: "Technical cookies" (required)
          'LinkedIn Insight Tag': Didomi.getUserConsentStatusForVendor('c:linkedin'),
          'ActiveCampaign': true, // can't opt-out because qto_internal_analytics (required)
          'Bing Ads': Didomi.getUserConsentStatusForVendor('c:bing-ads'),
          'Hotjar': true, // because purpose: "Internal Analytics" (required)
          'Intercom': Didomi.getUserConsentStatusForVendor('c:intercom'),
          'Twitter Ads': Didomi.getUserConsentStatusForVendor('c:twitter'),
          'DoubleClick Floodlight': Didomi.getUserConsentStatusForVendor('c:double-click'),
          'AdWords Remarketing Lists': Didomi.getUserConsentStatusForVendor('c:double-click'),
          'Google Ads (Gtag)': Didomi.getUserConsentStatusForVendor('c:double-click'),
          'AdWords': Didomi.getUserConsentStatusForVendor('c:g-adwords')
        }
      }
    );
    analytics.page({
      url: window.location.href,
      user_ga_id: getGaId(),
      id_tools_synch: window.pageIdForToolsSynch,
      gdpr_consent_status: getDidomiCookieConsent(),
      page_template: pageTemplate(),
      page_universe: pageUniverse(),
      page_country: pageCountry(),
      user_platform: userPlatform(),
      page_content_type: pageContentTypeValue(),
    });
    }
  }();
}

const sendToDataLayer = () => {
  // Send info to data layer
  window.dataLayer = window.dataLayer || [];
  dataLayer.push({
    event: 'static_datalayer',
    id_tools_synch: window.pageIdForToolsSynch,
    gdpr_consent_status : getDidomiCookieConsent(),
    page_template: pageTemplate(),
    page_universe: pageUniverse(),
    page_country: pageCountry(),
    user_platform: userPlatform(),
    page_content_type: pageContentTypeValue(),
  });
}

const pageContentTypeValue = () => {
  const body = document.querySelector('body');
  const actionName = `${body.dataset.controllerName}#${body.dataset.actionName}`
  if (actionName === 'articles#show') {
    return 'Article';
  } else if (actionName === 'tags#category') {
    return 'Category';
  } else if (actionName === 'tags#subcategory') {
    return 'Subcategory';
  } else {
    return 'Other';
  }
}

const pageUniverse = () => {
  return location.pathname.substring(1, 8);
}

const pageTemplate = () => {
  return 'Blog';
}

const pageCountry = () => {
  return location.pathname.substring(1, 3);
}

const userPlatform = () => {
  return /Mobi/i.test(window.navigator.userAgent) ? 'Web Mobile' : 'Web Desktop';
}

const addSegmentIdentifyEvent = () => {
  if (!window && !window.analytics) return;

  window.analytics.identify(
    {
      user_ga_id : getGaId(),
      gdpr_consent_status : getDidomiCookieConsent(),
      website_locale: pageCountry()
    }
  );
}

const addSegmentTrackEvent = (event, name = 'website_cta_blog') => {
  const pageType = event.currentTarget.dataset.pageType;
  const data = {
    page_url: window.location.href,
    command: command(pageType),
    category: 'Navigation',
    action: action(pageType),
    label: event.currentTarget.dataset.label,
    location: event.currentTarget.dataset.location,
    target: event.currentTarget.href,
    user_ga_id: getGaId(),
    id_tools_synch: getHash(),
    gdpr_consent_status: getDidomiCookieConsent()
  }
  analytics.track(
    event.currentTarget.dataset.track || name,
    data,
    segmentTrackOptions()
  );
}

const command = (pageType) => {
  if (pageType === 'website') return 'cta';

  return 'ctaBlog'
}

const action = (pageType) => {
  if (pageType === 'website') return 'CTA';

  return 'CTABlog'
}

const segmentTrackOptions = () => {
  // in case ga is blocked by an adblocker
  try {
    const gaClientId = ga.getAll()[0].get('clientId');
    // Sends GA id to Segment personas
    return {
      context: {
        integrations: {
          'Google Analytics': {
            clientId: gaClientId
          }
        }
      }
    }
  } catch (error) {
    return {};
  }
};
