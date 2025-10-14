import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createApi } from "unsplash-js";
import { UNSPALSH_CAT_IMG } from "../constan";

const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

interface Urls {
  small: string;
  regular: string;
}

interface Photo {
  id: string;
  alt_description: string | null;
  urls: Urls;
}

const unsplash = createApi({
  accessKey: accessKey || "fallback_access_key",
});

const PER_PAGE = 10;
const UNSPLASH_CATEGORIRES = UNSPALSH_CAT_IMG;

const InfiniteScroll: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // This will hold the observer instance
  const observer = useRef<IntersectionObserver | null>(null);

  // This is the ref that we will attach to the last photo element.
  // When this element becomes visible, we'll trigger a new fetch.
  const lastPhotoElementRef = useCallback(
    (node: HTMLDivElement) => {
      // If we are currently loading, do nothing.
      if (loading) return;

      // Disconnect the old observer before creating a new one.
      if (observer.current) observer.current.disconnect();

      // Create a new observer.
      observer.current = new IntersectionObserver((entries) => {
        // If the element is intersecting (visible) and there are more photos to load...
        if (entries[0].isIntersecting && hasMore) {
          // ...increment the page number to trigger a fetch.
          setPage((prevPage) => prevPage + 1);
        }
      });

      // If the node (the last element) exists, start observing it.
      if (node) observer.current.observe(node);
    },
    [loading, hasMore] // Re-create the callback if loading or hasMore changes.
  );

  // Effect for fetching data when the page number changes.
  useEffect(() => {
    if (!hasMore) return; // Stop fetching if there are no more photos
    const query =
      UNSPLASH_CATEGORIRES?.[
        Math.floor(Math.random() * UNSPLASH_CATEGORIRES.length + 1)
      ];
    setLoading(true);
    unsplash.search
      .getPhotos({ page, perPage: PER_PAGE, query: query })
      .then((res) => {
        if (res.type === "success") {
          const newPhotos = res.response.results as Photo[];
          setHasMore(newPhotos.length > 0);
          setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
        }
      })
      .catch((e) => {
        console.error("Error fetching photos:", e);
        setHasMore(false); // Stop trying on error
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]); // This effect runs only when the page number changes.

  return (
    <div className="container-fluid">
      <h2 className="my-4 pb-4 text-center">Infinite Scroll with Observer</h2>
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          {photos.map((photo, index) => {
            // If this is the last photo in the current list, attach the ref to it.
            if (photos.length === index + 1) {
              return (
                <div ref={lastPhotoElementRef} key={photo.id}>
                  <PhotoCard photo={photo} />
                </div>
              );
            } else {
              return <PhotoCard key={photo.id} photo={photo} />;
            }
          })}
        </div>
      </div>

      {loading && (
        <div className="d-flex justify-content-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!hasMore && photos.length > 0 && (
        <div className="alert alert-info my-4 text-center" role="alert">
          You've reached the end of the gallery!
        </div>
      )}
    </div>
  );
};

// A simple component to display the photo card to avoid repetition.
const PhotoCard: React.FC<{ photo: Photo }> = ({ photo }) => (
  <div className="card mb-4 shadow-sm">
    <img
      src={photo.urls.regular}
      alt={photo.alt_description ?? "Unsplash Photo"}
      className="card-img-top"
      style={{ height: "450px", objectFit: "cover" }}
      loading="lazy"
    />
    <div className="card-body">
      <p className="card-text text-center fw-bolder text-success">
        {photo.alt_description || "No description available"}
      </p>
    </div>
  </div>
);

export default InfiniteScroll;
